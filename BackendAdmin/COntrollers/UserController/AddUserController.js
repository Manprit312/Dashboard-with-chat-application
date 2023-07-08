const user = require('../../Models/users');
const db = require('../../db');
exports.AddUsers = async (req, res) => {


  var users = new user(req.body);

  await users.save();
  res.send('newuser added successFully');
};
