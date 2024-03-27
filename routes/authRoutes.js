// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Routes for user authentication
const isAuthenticated = require('../middleware/authMiddleware');
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/google', authController.thirdPartyLogin); // Example route for Google OAuth login
router.get('/google/callback', authController.thirdPartyCallback); // Example route for Google OAuth callback

module.exports = router;
