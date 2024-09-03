const Joi = require("joi");

const scUserSchema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string(),
  mail: Joi.string().required(),
  zoomMail: Joi.string().empty(""),
  crmId: Joi.number(),
  contactId: Joi.number(),
  adult: Joi.bool(),
  age: Joi.string().empty(""),
  lang: Joi.string(),
  course: Joi.string(),
  package: Joi.string().empty(""),
  visited: Joi.array().items(Joi.string()),
  visitedTime: Joi.array().items(Joi.string()),
  knowledge: Joi.string().empty(""),
  successRate: Joi.string(),
  temperament: Joi.string(),
  feedback: Joi.string(),
});

const validateScUser = ({ body }, res, next) => {
  const { error } = scUserSchema.validate(body);

  if (error) return res.status(400).json(error.details[0].message);
  console.log("validated");
  next();
};

module.exports = {
  validateScUser,
};
