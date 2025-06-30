const Joi = require("joi");

const pedagogiumLessonQuestionSchema = Joi.object({
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

const pedagogiumLessonSchema = Joi.object({
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

  questions: [pedagogiumLessonQuestionSchema],
});

const validatePedagogiumLesson = ({ body }, res, next) => {
  const { error } = pedagogiumLessonSchema.validate(body);
  if (error) return res.status(400).json(error.details[0].message);

  next();
};

const validatePedagogiumLessonQuestion = ({ body }, res, next) => {
  const { error } = pedagogiumLessonQuestionSchema.validate(body);
  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validatePedagogiumLesson,
  validatePedagogiumLessonQuestion,
};
