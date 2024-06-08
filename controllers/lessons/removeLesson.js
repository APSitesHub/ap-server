const { deleteLesson } = require("../../services/lessonsServices");

const removeLesson = async (req, res) => {
  res.status(204).json(await deleteLesson(req.params.id));
};

module.exports = removeLesson;
