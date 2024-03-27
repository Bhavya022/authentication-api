const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authenticateUser } = require('../middleware/authMiddleware');

// Route for getting user profile
router.get('/profile', authenticateUser, profileController.getUserProfile);

// Route for updating user profile
router.put('/profile', authenticateUser, profileController.updateUserProfile);

// Route for updating profile visibility
router.put('/profile/visibility', authenticateUser, profileController.updateProfileVisibility);

module.exports = router;
