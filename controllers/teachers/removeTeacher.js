const { deleteUser, findUserByID } = require("../../services/usersServices");

const removeTeacher = async (req, res) => {
  console.log(await findUserByID(req.params.id));
  res.status(204).json(await deleteUser(req.params.id));
};

module.exports = removeTeacher;
