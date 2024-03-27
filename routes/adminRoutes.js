const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateUser, checkAdminRole } = require('../middleware/authMiddleware');

// Route for getting all users (for admin)
router.get('/users', authenticateUser, checkAdminRole, adminController.getAllUsers);

// Route for getting user by ID (for admin)
router.get('/user/:id', authenticateUser, checkAdminRole, adminController.getUserById);

module.exports = router;
