const { newLesson } = require("../../services/lessonsServices");

const addLesson = async (req, res) => res.status(201).json(await newLesson(req.body));

module.exports = addLesson;
