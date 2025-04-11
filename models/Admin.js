const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: {
      type: Boolean,
      default: true,
    },
  });
  
  const Admin = mongoose.model('Admin', userSchema);
  module.exports = Admin;
  
  