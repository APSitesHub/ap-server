const { updateLesson } = require("../../services/lessonsServices");

const editLesson = async (req, res) => {
  res.status(200).json(await updateLesson(req.params.id, req.body));
};

module.exports = editLesson;
