// controllers/adminController.js

// Import necessary modules
const User = require('../models/user');

// Controller functions for admin actions
const adminController = {
    // Get all user profiles (both public and private)
    getAllProfiles: async (req, res) => {
        try {
            // Check if the user is an admin
            if (!req.user.isAdmin) {
                return res.status(403).json({ message: 'Unauthorized' });
            }

            // Fetch all user profiles
            const users = await User.find();

            // Send the list of user profiles in the response
            res.json(users);
        } catch (error) {
            console.error('Error fetching user profiles:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = adminController;
