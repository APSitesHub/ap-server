const { findPointsByLessonId } = require("../../services/lessonResultsServices");

const getPointsByLessonId = async (req, res) => {
  try {
    res.json(await findPointsByLessonId(req.params.lessonId));
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getPointsByLessonId;
