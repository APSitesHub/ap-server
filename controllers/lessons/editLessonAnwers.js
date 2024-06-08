const { updateLesson } = require("../../services/lessonsServices");

const editLessonAnwers = async (req, res) => {
  res
    .status(200)
    .json(await updateLesson(req.params.id, { $addToSet: { faq: req.body } }));
};

module.exports = editLessonAnwers;
