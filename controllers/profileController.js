const User = require('../models/User');

// Controller for getting user profile
exports.getUserProfile = async (req, res) => {
  try { 
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Controller for updating user profile
exports.updateUserProfile = async (req, res) => {
  const { name, bio, phone, profileVisibility } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update profile fields
    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (phone) user.phone = phone;
    if (profileVisibility) user.profileVisibility = profileVisibility;

    await user.save();

    res.json({ msg: 'Profile updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Controller for updating profile visibility
exports.updateProfileVisibility = async (req, res) => {
  const { profileVisibility } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.profileVisibility = profileVisibility;

    await user.save();

    res.json({ msg: 'Profile visibility updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
