require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogSystem', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Basic Route
app.get('/', (req, res) => {
    res.send('Welcome to the Blog API!');
});

// Start Server
const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

app.use('/api/auth', authRoutes);
app.use('/api', blogRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);


app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
const path = require('path');
app.use(express.static(path.join(__dirname, 'frontend')));
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });