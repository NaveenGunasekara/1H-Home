const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Public registration handler targeted by visitors via the /createaccount route
const registerPublicUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // 1. Basic body verification checks
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing parameters. Please fill in all fields.' });
    }

    // 2. Check if user node is already provisioned
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ message: 'Email address node is already registered.' });
    }

    // 3. Force default role safely to 'Client' to avoid privilege escalations
    const user = new User({
      name,
      email: email.toLowerCase(),
      password, 
      role: 'Client' 
    });

    await user.save();

    // 4. Generate security token signature payload
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET || 'secretkey', 
      { expiresIn: '30d' }
    );

    // 5. Dispatch success response payload matrix
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });

  } catch (err) {
    console.error("Public Registration Catch Block Exception:", err.message);
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

module.exports = {
  registerPublicUser
  // ... include your other controller targets here (like loginUser)
};