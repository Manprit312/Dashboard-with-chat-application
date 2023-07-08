const mongoose = require('mongoose');
const RegisteredUserSchema = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
});

const RegisteredUser = mongoose.model('RegisteredUser', RegisteredUserSchema);
module.exports = RegisteredUser;
