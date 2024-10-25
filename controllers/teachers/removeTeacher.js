const {
  deleteTeacher,
  findTeacherByID,
} = require("../../services/teachersServices");

const removeTeacher = async (req, res) => {
  console.log(await findTeacherByID(req.params.id));
  res.status(204).json(await deleteTeacher(req.params.id));
};

module.exports = removeTeacher;
