const user = require('../../Models/users');
const db = require('../../db');
const multer = require('multer');
exports.EditUser = async (req, res) => {
  console.log(req.body, '>>>>>>>>>>>>>>>>>>>>>>');

 
  const EditUser = await user.findByIdAndUpdate(req.params.id, {
    $set: {
      name: req?.body?.name,
      company: req?.body?.company,
      verified: req?.body?.verified,
      avatarUrl: req.body.avatarUrl,
      status: req?.body?.status,
      role: req?.body?.role,
    },
    new: true,
  });

  res.send({
    message: 'EditUser,',
    EditUser,
  });
};
