const Joi = require("joi");

const quizLeadSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(10).max(20).required(),
  tag: Joi.string().empty(""),
  lang: Joi.string().empty(""),
  crmId: Joi.number(),
  adult: Joi.bool().required(),
  age: Joi.string().required(),
  knowledge: Joi.string().required(),
  quantity: Joi.string().required(),
  difficulties: Joi.string().required(),
  interests: Joi.string().required(),
});

const validateQuizLead = ({ body }, res, next) => {
  const { error } = quizLeadSchema.validate(body);
  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validateQuizLead,
};
