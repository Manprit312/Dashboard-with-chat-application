const RegisteredUser = require('../../Models/authenticatedUser');
const db = require('../../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
exports.RegisterUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const ExistUser = await RegisteredUser.findOne({ email: email });

    if (!ExistUser) {
      const SaveUser = new RegisteredUser({
        email: email,
        password: await bcrypt.hash(password, 10),
      });
      console.log(password);
      await SaveUser.save();
      res.send({
        status: 200,
        messege: 'user registered successfully',
      });
    } else {
      res.send({
        status: 201,
        messege: 'user exist already',
      });
    }
  } catch (err) {
    return next(err);
  }
};
