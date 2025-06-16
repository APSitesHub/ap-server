const Joi = require("joi");

const pedagogiumCoursesSchema = Joi.object({
  courseName: Joi.string().min(3).max(100).required(),
  slug: Joi.string().required(),
  courseGroups: Joi.array().items(Joi.number()),
  university: Joi.string().min(3).max(200).required(),
});

const validatePedagogiumCourse = ({ body }, res, next) => {
  const { error } = pedagogiumCoursesSchema.validate(body);
  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validatePedagogiumCourse,
};
