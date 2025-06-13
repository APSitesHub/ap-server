const Joi = require("joi");

const pedagogiumTeacherSchema = Joi.object({
  name: Joi.string(),
  login: Joi.string().required(),
  password: Joi.string().required(),
  platformId: Joi.string(),
  visited: Joi.array().items(Joi.string()),
  visitedTime: Joi.array().items(Joi.string()),
  token: Joi.string(),
});

const validatePedagogiumTeacher = ({ body }, res, next) => {
  const { error } = pedagogiumTeacherSchema.validate(body);

  if (error) return res.status(400).json(error.details[0].message);
  console.log("validated");
  next();
};

module.exports = {
  validatePedagogiumTeacher,
};
