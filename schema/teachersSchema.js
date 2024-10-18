const Joi = require("joi");

const teacherSchema = Joi.object({
  name: Joi.string(),
  login: Joi.string().required(),
  password: Joi.string().required(),
  visited: Joi.array().items(Joi.string()),
  visitedTime: Joi.array().items(Joi.string()),
  token: Joi.string(),
});

const validateTeacher = ({ body }, res, next) => {
  const { error } = teacherSchema.validate(body);

  if (error) return res.status(400).json(error.details[0].message);
  console.log("validated");
  next();
};

module.exports = {
  validateTeacher,
};
