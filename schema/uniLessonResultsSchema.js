const Joi = require("joi");

const uniLessonResultsQuestionSchema = Joi.object({
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

const uniLessonResultsSchema = Joi.object({
  page: Joi.string().required().messages({
    "string.base": "Page must be a string",
    "any.required": "Page is required",
  }),

  uniName: Joi.string().required().messages({
    "string.base": "uniName must be a string",
    "any.required": "uniName is required",
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

  questions: [uniLessonResultsQuestionSchema],
});

const validateLessonResults = ({ body }, res, next) => {
  const { error } = uniLessonResultsSchema.validate(body);

  if (error) return res.status(400).json(error.details[0].message);

  next();
};

const validateLessonResultsQuestion = ({ body }, res, next) => {
  const { error } = uniLessonResultsQuestionSchema.validate(body);
  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validateLessonResults,
  validateLessonResultsQuestion,
};
