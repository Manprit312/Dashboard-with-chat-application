const RegisteredUser = require('../../Models/authenticatedUser');
exports.allusers = async (req, res) => {
  const existuser = await RegisteredUser.find();

  res.send({
    messege: 'user logged in',
    data: existuser,
  });
};
