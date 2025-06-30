const { newQuestion } = require("../../services/uniLessonResultsServices");

const addQuestion = async (req, res) => {
  try {
    const updatedLesson = await newQuestion(req.params.lessonId, req.body);
    res.status(200).json(updatedLesson);
  } catch (error) {
    if (error.message === "Lesson not found") {
      return res.status(404).json({ error: error.message });
    }

    if (
      error.message === "Question with this ID already exists in the lesson"
    ) {
      return res.status(409).json({ error: error.message });
    }

    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = addQuestion;
