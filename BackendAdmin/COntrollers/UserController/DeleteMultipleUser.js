const user = require('../../Models/users');
const db = require('../../db');
exports.DeleteMultiple = async (req, res) => {
  console.log(req.body);
  const data = req.body;

  data.map(async (item) => await user.findByIdAndDelete(item));

  //   await users.save();
  res.send('newuser added successFully',);
};
