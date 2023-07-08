const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  avatarUrl: { type: String },
  name: { type: String },
  company: { type: String },
  verified: { type: String },
  status: { type: String },
  role: { type: String },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
