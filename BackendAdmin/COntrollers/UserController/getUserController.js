const user = require('../../Models/users');
const db = require('../../db');
exports.getAllUsers =async (req, res) => {
  const data = await user.find()
  console.log(data)
  res.send(data);

};
