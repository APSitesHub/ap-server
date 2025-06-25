const {
  findPointsByLessonId,
} = require("../../services/pedagogiumLessonServices");

const getPointsByLessonId = async (req, res) =>
  res.json(await findPointsByLessonId(req.params.lessonId));

module.exports = getPointsByLessonId;
