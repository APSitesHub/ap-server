const Joi = require("joi");

const quizLeadAuthCodeSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  phone: Joi.string().min(10).max(20),
  authCode: Joi.string(),
  mail: Joi.string(),
  password: Joi.string(),
  tag: Joi.string().empty(""),
  lang: Joi.string().empty(""),
  crmId: Joi.number(),
  contactId: Joi.number(),
  adult: Joi.bool().required(),
  age: Joi.string().required(),
  knowledge: Joi.string().required(),
  quantity: Joi.string().required(),
  difficulties: Joi.string().required(),
  interests: Joi.string().required(),
  leadPage: Joi.string(),
  utm_content: Joi.string().empty(""),
  utm_medium: Joi.string().empty(""),
  utm_campaign: Joi.string().empty(""),
  utm_source: Joi.string().empty(""),
  utm_term: Joi.string().empty(""),
  utm_referrer: Joi.string().empty(""),
  referrer: Joi.string().empty(""),
  gclientid: Joi.string().empty(""),
  gclid: Joi.string().empty(""),
  fbclid: Joi.string().empty(""),
});

const validateQuizAuthCodeLead = ({ body }, res, next) => {
  const { error } = quizLeadAuthCodeSchema.validate(body);
  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validateQuizAuthCodeLead,
};
