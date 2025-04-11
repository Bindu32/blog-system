const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware');
const adminOnly = require('../middlewares/adminMiddleware');
const Admin = require('../models/Admin');
const User = require('../models/User');
const BlogPost = require('../models/BlogPost');

// Get all users
router.get('/user', authenticateUser, adminOnly, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Delete a user
router.delete('/user/:id', authenticateUser, adminOnly, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

// Delete any blog post
router.delete('/blogs/:id', authenticateUser, adminOnly, async (req, res) => {
  await BlogPost.findByIdAndDelete(req.params.id);
  res.json({ message: 'Blog post deleted' });
});

module.exports = router;
