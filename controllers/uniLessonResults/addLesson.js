const { newLesson } = require("../../services/uniLessonResultsServices");

const addLesson = async (req, res) => {
  try {
    res.status(201).json(await newLesson(req.body));
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = addLesson;
