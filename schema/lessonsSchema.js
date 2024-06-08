const Joi = require("joi");

const lessonsSchema = Joi.object({
  marathonId: Joi.string().required(),
  lessonId: Joi.string().required(),
  marathonName: Joi.string().required(),
  lang: Joi.string().required(),
  level: Joi.string().required(),
  lesson: Joi.string().required(),
  topic: Joi.string().required(),
  keysEn: Joi.string().required(),
  keysUa: Joi.string().required(),
  pdf: Joi.array().items(Joi.string().empty("")) || Joi.array().length(0),
  video: Joi.array().items(Joi.string().empty("")) || Joi.array().length(0),
  faq: Joi.array().items(
    Joi.object({
      exercise: Joi.string(),
      question: Joi.string(),
      answer: Joi.string(),
    })
  ),
});

const validateLesson = ({ body }, res, next) => {
  const { error } = lessonsSchema.validate(body);
  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validateLesson,
};
