const { updateTeacher } = require("../../services/pedagogiumTeachersServices");

const editTeacher = async (req, res) => {
  res.status(200).json(await updateTeacher(req.params.id, req.body));
};

module.exports = editTeacher;
