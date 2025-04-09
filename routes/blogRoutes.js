const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const User = require('../models/User');
const authenticateUser = require('../middleware/authMiddleware');



// Create a new blog post
const authenticateUser = require('../middleware/authMiddleware');

router.post('/create', authenticateUser, async (req, res) => {
  try {
    const { title, body } = req.body;

    const newPost = new BlogPost({
      title,
      body,
      author: req.user.userId, // userId from decoded token
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

  
// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find().populate('author', 'username email');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get blog posts' });
  }
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('author', 'username');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get post' });
  }
});

// Update a blog post
router.put('/:id', async (req, res) => {
  try {
    const { title, body } = req.body;
    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { title, body, updatedAt: new Date() },
      { new: true }
    );
    if (!updatedPost) return res.status(404).json({ error: 'Post not found' });
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Delete a blog post
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router;


  
