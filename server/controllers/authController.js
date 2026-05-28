const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '8h' });
};

// Updated signature to cleanly handle Express middleware lifecycle arguments (req, res, next)
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2. Create the user with the explicitly requested role (defaults to 'admin' if sent)
    const user = await User.create({ 
      name, 
      email, 
      password,
      role: role || 'admin' 
    });

    // 3. Return successfully registered asset details
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    // Passes the validation/database error downstream to server.js error handler securely
    next(error); 
  }
};

// Updated signature to cleanly handle Express middleware lifecycle arguments (req, res, next)
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Find user account by email profile mapping
    const user = await User.findOne({ email });
    
    // 2. Validate password hash match integrity rules
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    // Passes down any unexpected execution errors safely
    next(error); 
  }
};