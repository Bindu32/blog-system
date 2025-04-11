const express = require('express');
const User = require('../models/User');
const authenticateUser = require('../middleware/authMiddleware');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Get user profile
router.get('/profile', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// Update user settings
router.put('/settings', authenticateUser, async (req, res) => {
  try {
    const { username, email, password, profilePic, themeMode } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    if (profilePic) user.profilePic = profilePic;
    if (themeMode) user.themeMode = themeMode;

    await user.save();

    res.json({ message: 'User settings updated successfully' });
  } catch (err) {
    console.error('Error updating settings:', err);
    res.status(500).json({ message: 'Error updating settings' });
  }
});

// Delete user account
router.delete('/delete', authenticateUser, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.userId);
    res.json({ message: 'User account deleted successfully' });
  } catch (err) {
    console.error('Error deleting account:', err);
    res.status(500).json({ message: 'Error deleting account' });
  }
});

// Get all posts by the logged-in user
router.get('/user/me/posts', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const posts = await BlogPost.find({ author: userId }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch your posts' });
  }
});



module.exports = router;
