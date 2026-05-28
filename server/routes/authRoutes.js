const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// ========================================================
// 🔓 PUBLIC ENDPOINTS (No Token Needed to Access These)
// ========================================================

// PUBLIC ENDPOINT: Create Account Form Submission
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All registration parameters are required.' });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ message: 'Email address node is already provisioned.' });
    }

    // New registrations from the public page are safely assigned the 'Client' role
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password, // Automatically hashed via your pre-save hook schema model
      role: 'Client'
    });

    await newUser.save();

    // Generate token so the user gets automatically authenticated on completion
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '24h' }
    );

    return res.status(201).json({
      message: 'User registered successfully.',
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
    });
  } catch (err) {
    next(err);
  }
});

// PUBLIC ENDPOINT: Admin & User Login Portal Check
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password paths.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials provided.' });
    }

    // Compare encrypted input match checks
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials provided.' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      message: 'Authentication successful.',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    next(err);
  }
});


// ========================================================
// 🛡️ SECURE ADMIN FILTER (Guard Middleware Layer)
// ========================================================
const verifyAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access Denied: No Token Supplied' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    
    const searchId = decoded.id || decoded._id;
    const user = await User.findById(searchId);

    if (!user) {
      return res.status(401).json({ message: 'Authorization error: Target account context does not exist.' });
    }

    // Case-insensitive verification to prevent lockouts caused by casing differences
    if (!user.role || user.role.toLowerCase() !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Requires Admin privileges' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Authentication error', error: err.message });
  }
};


// ========================================================
// 🔒 PROTECTED CRUD ENDPOINTS (Requires Valid Admin Token)
// ========================================================

// CRUD 1: READ ALL
router.get('/all-users', verifyAdmin, async (req, res, next) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

// CRUD 2: ADMIN MANUAL CREATE USER
router.post('/admin-create-user', verifyAdmin, async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ message: 'Email node is already provisioned.' });
    }

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password,
      role: role || 'Client'
    });

    await newUser.save();
    return res.status(201).json({ message: 'User profile node created successfully.' });
  } catch (err) {
    next(err);
  }
});

// CRUD 3: UPDATE DATA & ROLE
router.put('/update-user-panel', verifyAdmin, async (req, res, next) => {
  try {
    const { userId, name, email, role } = req.body;

    if (req.user._id.toString() === userId && (!role || role.toLowerCase() !== 'admin')) {
      return res.status(400).json({ message: 'Protection lock: You cannot demote yourself from Admin status.' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email: email.toLowerCase(), role },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User profile not found.' });
    }

    return res.status(200).json({ message: 'User structural properties updated.', updatedUser });
  } catch (err) {
    next(err);
  }
});

// CRUD 4: DELETE USER NODE
router.delete('/delete-user/:id', verifyAdmin, async (req, res, next) => {
  try {
    const targetUserId = req.params.id;

    if (req.user._id.toString() === targetUserId) {
      return res.status(400).json({ message: 'Protection lock: You cannot wipe your own active account session.' });
    }

    const userToDelete = await User.findByIdAndDelete(targetUserId);
    if (!userToDelete) {
      return res.status(404).json({ message: 'Target user node not found.' });
    }

    return res.status(200).json({ message: 'User node completely removed from directory.' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;