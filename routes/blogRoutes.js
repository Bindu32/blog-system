const express = require('express');
const BlogPost = require('../models/BlogPost');

const router = express.Router();

// Create Blog Post
router.post('/blog', async (req, res) => {
    try {
        const { title, content, authorId } = req.body;
        const blogPost = new BlogPost({ title, content, author: authorId });
        await blogPost.save();
        res.status(201).json(blogPost);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get All Blog Posts
router.get('/blogs', async (req, res) => {
    const blogs = await BlogPost.find().populate('author', 'username');
    res.json(blogs);
});

module.exports = router;
