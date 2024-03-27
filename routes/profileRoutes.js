// routes/profileRoutes.js

const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const isAuthenticated = require('../middleware/authMiddleware');

// Routes for user profile management
router.get('/profile', isAuthenticated, profileController.getProfile);
router.put('/profile', isAuthenticated, profileController.editProfile);

module.exports = router;
