const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String, // ⬅️ You missed this comma
  //savedBlogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' }],
  likedBlogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' }],
  isFirstTime: { type: Boolean, default: true },
  about: { type: String, default: "" },
  profilePic: { type: String, default: "" }
});

module.exports = mongoose.model('User', userSchema);
