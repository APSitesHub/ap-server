const Joi = require("joi");

const wbUserSchema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string(),
  mail: Joi.string().required(),
  crmId: Joi.number(),
  contactId: Joi.number(),
  lang: Joi.string(),
  course: Joi.string(),
  package: Joi.string().empty(""),
  visited: Joi.array().items(Joi.string()),
  visitedTime: Joi.array().items(Joi.string()),
  knowledge: Joi.string().empty(""),
});

const validateWbUser = ({ body }, res, next) => {
  const { error } = wbUserSchema.validate(body);

  if (error) return res.status(400).json(error.details[0].message);
  console.log("validated");
  next();
};

module.exports = {
  validateWbUser,
};
