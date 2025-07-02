const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Only needed if you want to return token after signup
const User = require('../models/User');

const signControl = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //check existing username
    const existingUser = await User.findOne({username});
    if(existingUser) {
        return res.status(408).json({ message: 'username not available' });
    }

    // Check if email already exists
    const existingMail = await User.findOne({ email });
    if (existingMail) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Optionally create JWT token after signup
    // const token = jwt.sign({ id: newUser._id }, 'your_secret', { expiresIn: '1h' });

    return res.status(201).json({ message: 'Signup successful' }); // , token if needed
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = signControl;
