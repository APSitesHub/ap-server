const Joi = require("joi");

const lessonResultsQuestionSchema = Joi.object({
  questionId: Joi.string().required(),

  correctAnswer: Joi.string().required(),

  answers: Joi.array().items(
    Joi.object({
      userId: Joi.string().required(),
      userName: Joi.string().required(),
      answer: Joi.string().required(),
    })
  ),
});

const lessonResultsSchema = Joi.object({
  page: Joi.string().required().messages({
    "string.base": "Page must be a string",
    "any.required": "Page is required",
  }),

  teacherName: Joi.string().required().messages({
    "string.base": "Teacher name must be a string",
    "any.required": "Teacher name is required",
  }),

  lessonName: Joi.string().required().messages({
    "string.base": "Lesson name must be a string",
    "any.required": "Lesson name is required",
  }),

  lessonNumber: Joi.string().required().messages({
    "string.base": "Lesson number must be a string",
    "any.required": "Lesson number is required",
  }),

  questions: [lessonResultsQuestionSchema],
});

const validateLessonResults = ({ body }, res, next) => {
  const { error } = lessonResultsSchema.validate(body);

  if (error) return res.status(400).json(error.details[0].message);

  next();
};

const validateLessonResultsQuestion = ({ body }, res, next) => {
  const { error } = lessonResultsQuestionSchema.validate(body);
  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validateLessonResults,
  validateLessonResultsQuestion,
};
