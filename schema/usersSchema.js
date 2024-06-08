const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string(),
  mail: Joi.string().required(),
  password: Joi.string().required(),
  crmId: Joi.number(),
  pupilId: Joi.string(),
  age: Joi.string().empty(""),
  lang: Joi.string(),
  course: Joi.string(),
  package: Joi.string().empty(""),
  visited: Joi.array().items(Joi.string()),
  visitedTime: Joi.array().items(Joi.string()),
  points: Joi.string().empty(""),
  knowledge: Joi.string().empty(""),
  manager: Joi.string().empty(""),
  token: Joi.string(),
  isBanned: Joi.bool(),
});

const validateUser = ({ body }, res, next) => {
  const { error } = userSchema.validate(body);

  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validateUser,
};
