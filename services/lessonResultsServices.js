const LessonResults = require("../db/models/lessonResults");

const newLesson = async (body) => {
  const lesson = new LessonResults(body);

  const savedLesson = await lesson.save();
  return savedLesson.id
    ? {
        status: "success",
        message: "Lesson added successfully",
        lessonId: savedLesson.id,
      }
    : {
        status: "error",
        message: "Failed to add lesson",
      };
};

const newQuestion = async (lessonId, body) => {
  const lesson = await LessonResults.findById(lessonId);

  if (!lesson) {
    throw new Error("Lesson not found");
  }

  if (lesson.questions.some((q) => q.questionId === body.questionId)) {
    throw new Error("Question with this ID already exists in the lesson");
  }

  const correct = body.correctAnswer.trim().toLowerCase();

  const uniqueByUserId = [];
  const seenUserIds = new Set();

  for (const answer of body.answers) {
    if (!seenUserIds.has(answer.userId)) {
      seenUserIds.add(answer.userId);
      uniqueByUserId.push(answer);
    }
  }

  const processedAnswers = uniqueByUserId.map((answer) => {
    const normalizedAnswer = answer.answer.trim().toLowerCase();
    const isCorrect = normalizedAnswer === correct;
    return {
      ...answer,
      answer: normalizedAnswer,
      points: isCorrect ? 1 : 0,
    };
  });

  const question = {
    questionId: body.questionId,
    correctAnswer: body.correctAnswer,
    answers: processedAnswers,
  };

  lesson.questions.push(question);

  const updatedLesson = await lesson.save();
  return updatedLesson;
};

const findLessonsByGroup = async (group) =>
  await LessonResults.find({ page: group });

const findLessonsByGroupAndDate = async (group, date) => {
  const [day, month, year] = date.split(".").map(Number);

  if (!day || !month || !year) {
    throw new Error("Invalid date format. Expected dd.mm.yyyy");
  }

  const start = new Date(year, month - 1, day, 0, 0, 0, 0);
  const end = new Date(year, month - 1, day, 23, 59, 59, 999);

  const lessons = await LessonResults.find({
    page: group,
    createdAt: { $gte: start, $lte: end },
  });

  return lessons;
};

const findPointsByLessonId = async (lessonId) => {
  const points = [];
  const lesson = await LessonResults.findById(lessonId);

  lesson.questions.forEach((question) => {
    question.answers.forEach((answer) => {
      if (!points.some((user) => user._id === answer.userId)) {
        points.push({
          _id: answer.userId,
          name: answer.userName,
          totalPoints: 0,
          answers: [],
        });
      }
      const user = points.find((user) => user._id === answer.userId);

      if (!user.answers.some((answer) => answer.questionId === question._id)) {
        user.totalPoints += answer.points;

        user.answers.push({
          questionId: question._id,
          answerText: answer.answer,
          points: answer.points,
        });
      }
    });
  });

  return points;
};

module.exports = {
  newLesson,
  newQuestion,
  findLessonsByGroup,
  findLessonsByGroupAndDate,
  findPointsByLessonId,
};
