const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string(),
  mail: Joi.string().required(),
  zoomMail: Joi.string().empty(""),
  password: Joi.string().required(),
  crmId: Joi.number(),
  contactId: Joi.number(),
  pupilId: Joi.string(),
  marathonNumber: Joi.string().empty(""),
  adult: Joi.bool(),
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
  authCode: Joi.string(),
  successRate: Joi.string(),
  temperament: Joi.string(),
});

const validateUser = ({ body }, res, next) => {
  const { error } = userSchema.validate(body);

  if (error) return res.status(400).json(error.details[0].message);
  console.log("validated");
  next();
};

module.exports = {
  validateUser,
};
