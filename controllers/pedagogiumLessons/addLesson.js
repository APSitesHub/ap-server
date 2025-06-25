const { newLesson } = require("../../services/pedagogiumLessonServices");

const addLesson = async (req, res) =>
  res.status(201).json(await newLesson(req.body));

module.exports = addLesson;
