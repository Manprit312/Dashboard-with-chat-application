const user = require('../../Models/users');
const db = require('../../db');
exports.DeleteUser = async (req, res) => {
  //

  const deleteduser = await user.findByIdAndDelete(req.params.id);

  res.send({
    data: deleteduser,
  });
};
