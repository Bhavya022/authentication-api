const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { authenticateUser } = require('../middleware/authMiddleware');

// Route for user registration
router.post(
  '/register',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
    body('name', 'Name is required').notEmpty()
  ],
  authController.registerUser
);

// Route for user login
router.post('/login', authController.loginUser);

// Route for user logout
router.post('/logout', authenticateUser, authController.logoutUser);

module.exports = router;
