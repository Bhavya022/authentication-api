// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const isAuthenticated = require('../middleware/authMiddleware');

// Routes for admin actions
router.get('/profiles', isAuthenticated, adminController.getAllProfiles);

module.exports = router;
