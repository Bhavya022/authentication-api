const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware for authenticating user
exports.authenticateUser = async (req, res, next) => {
  // Check for token in headers
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user from payload to request object
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Middleware for checking user role (admin)
exports.checkAdminRole = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ msg: 'Access forbidden. Admin privileges required' });
  }
};

// Middleware for checking profile visibility
exports.checkProfileVisibility = (req, res, next) => {
  if (req.user && req.user.profileVisibility === 'public') {
    next();
  } else {
    res.status(403).json({ msg: 'Access forbidden. Profile is private' });
  }
};
