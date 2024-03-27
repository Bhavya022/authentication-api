// controllers/profileController.js

// Import necessary modules
const User = require('../models/user');

// Controller functions for profile management
const profileController = {
    // Get profile details
    getProfile: async (req, res) => {
        try {
            // Retrieve the user profile based on the user ID from the request
            const userId = req.user._id; // Assuming the user ID is stored in the request object after authentication
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if the profile is public or if the user is the owner or an admin
            if (user.isPublic || req.user.isAdmin || user._id.equals(userId)) {
                return res.json(user); // Return the user profile
            } else {
                return res.status(403).json({ message: 'Profile is private' });
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Edit profile details
    editProfile: async (req, res) => {
        try {
            const userId = req.user._id;
            const { name, email, bio } = req.body; // Extract fields to update from req.body

            // Fetch the user profile
            let user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update user profile fields
            if (name) user.name = name;
            if (email) user.email = email;
            if (bio) user.bio = bio;

            // Save the updated user profile
            user = await user.save();

            res.json(user); // Return the updated user profile
        } catch (error) {
            console.error('Error editing user profile:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = profileController;
