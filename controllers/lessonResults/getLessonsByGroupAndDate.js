const { findLessonsByGroupAndDate } = require("../../services/lessonResultsServices");

const getLessonsByGroupAndDate = async (req, res) => {
  try {
    res
      .status(201)
      .json(await findLessonsByGroupAndDate(req.params.group, req.params.date));
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getLessonsByGroupAndDate;
