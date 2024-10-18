const { updateTeacher } = require("../../services/teachersServices");

const editTeacher = async (req, res) => {
  res.status(200).json(await updateTeacher(req.params.id, req.body));
};

module.exports = editTeacher;
