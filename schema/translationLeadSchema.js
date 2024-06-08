const Joi = require("joi");

const translationLeadSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(10).max(20).required(),
  lang: Joi.string().required(),
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

const validateTranslationLead = ({ body }, res, next) => {
  const { error } = translationLeadSchema.validate(body);
  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validateTranslationLead,
};
