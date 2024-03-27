const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const { validationResult } = require('express-validator');

// Controller for user registration
exports.registerUser = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, name } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user
    user = new User({ email, password, name });
    await user.save();

    res.json({ msg: 'User registered successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Controller for user login
exports.loginUser = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).json(info);
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  })(req, res, next);
};

// Controller for user logout
exports.logoutUser = (req, res) => {
  req.logout();
  res.json({ msg: 'Logged out successfully' });
};

