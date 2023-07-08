const RegisteredUser = require('../../Models/authenticatedUser');
const db = require('../../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = 'gjygygyug';
exports.LoginUser = async (req, res) => {
  console.log('khkhkjhkjhkj');

  const { email, password } = req.body;
  console.log(email);
  console.log(email);

  const existuser = await RegisteredUser.findOne({ email: email });
  console.log(existuser.password);
  const allusers = await RegisteredUser.find();
  if (!existuser) {
    res.status(404).send('user not exist');
  } else {
    const matchpassword = await bcrypt.compare(password, existuser.password, (err, checktrue) => {
      if (err) throw err;
      else {
        console.log(checktrue);
        if (checktrue) {
          const token = jwt.sign({ existerUserEmail: existuser.email }, secret);
          console.log(token);

          res.send({
            messege: 'user logged in',
            data: existuser.email,
            

            token: token,
          });
        }
      }
    });
  }
};
