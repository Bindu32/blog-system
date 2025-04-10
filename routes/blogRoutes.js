const express = require('express');
const BlogPost = require('../models/BlogPost');
const User = require('../models/User');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

// 📌 Create Blog
router.post('/blogs', authenticateUser, async (req, res) => {
  const { title, content, category } = req.body;

  try {
    const blog = new BlogPost({
      title,
      content,
      category,
      author: req.user.userId,
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error creating blog' });
  }
});

// 📌 Get All Blogs
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await BlogPost.find().populate('author', 'username');
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs' });
  }
});

// 📌 Get Blog by ID
router.get('/blogs/:id', async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id).populate('author', 'username');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blog' });
  }
});

// 📌 Update Blog
router.put('/blogs/:id', authenticateUser, async (req, res) => {
  const { title, content, category } = req.body;
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (blog.author.toString() !== req.user.userId)
      return res.status(403).json({ message: 'Unauthorized' });

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.category = category || blog.category;
    await blog.save();

    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error updating blog' });
  }
});

// 📌 Delete Blog
// DELETE blog by ID (Only author can delete)
router.delete('/blogs/:id', authenticateUser, async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user.userId;

    const blog = await BlogPost.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if the logged-in user is the author
    if (blog.author.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this blog' });
    }

    await BlogPost.findByIdAndDelete(blogId);
    res.json({ message: 'Blog deleted successfully' });

  } catch (err) {
    console.error('❌ Error deleting blog:', err.message);
    res.status(500).json({ message: 'Error deleting blog' });
  }
});


// 📌 Like Blog
router.post('/blogs/:id/like', authenticateUser, async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (!blog.likes.includes(req.user.userId)) {
      blog.likes.push(req.user.userId);
      // remove dislike if exists
      blog.dislikes = blog.dislikes.filter(id => id.toString() !== req.user.userId);
    }

    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error liking blog' });
  }
});

// 📌 Dislike Blog
router.post('/blogs/:id/dislike', authenticateUser, async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (!blog.dislikes.includes(req.user.userId)) {
      blog.dislikes.push(req.user.userId);
      // remove like if exists
      blog.likes = blog.likes.filter(id => id.toString() !== req.user.userId);
    }

    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error disliking blog' });
  }
});

// POST save blog
/*router.post('/blogs/:id/save', authenticateUser, async (req, res) => {
  try {
    const blogId = req.params.id;
    const user = await User.findById(req.user.id);

    if (!user.savedBlogs.includes(blogId)) {
      user.savedBlogs.push(blogId);
      await user.save();
      res.status(200).json({ message: 'Blog saved successfully' });
    } else {
      res.status(400).json({ message: 'Blog already saved' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving blog' });
  }
});


// Unsave a blog
router.delete('/blogs/:id/save', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    user.savedBlogs = user.savedBlogs.filter(
      (blogId) => blogId.toString() !== req.params.id
    );
    await user.save();
    res.json({ message: 'Blog unsaved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error unsaving blog' });
  }
});*/

// 📌 Add Comment
router.post('/blogs/:id/comments', authenticateUser, async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const comment = {
      user: req.user.userId,
      text: req.body.text,
    };

    blog.comments.push(comment);
    await blog.save();

    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error commenting on blog' });
  }
});

module.exports = router;
