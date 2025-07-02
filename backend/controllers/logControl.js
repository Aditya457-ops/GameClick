const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const logControl = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res.status(402).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.jwtsecretkey, {
      expiresIn: '1h'
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = logControl;
