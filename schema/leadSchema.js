const Joi = require("joi");

const leadSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(10).max(20).required(),
  time: Joi.string().min(3).max(50).empty(""),
  tag: Joi.string().empty(""),
  lang: Joi.string().empty(""),
  crmId: Joi.number(),
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
const leadConfernceSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(10).max(20).required(),
  city: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  age: Joi.number().min(1).max(100).required(),
  source: Joi.string().min(1).max(100).required(),
  role: Joi.string().min(1).max(100).required(),
  job: Joi.string().min(1).max(100).required(),
  tag: Joi.string().empty(""),
  lang: Joi.string().empty(""),
  crmId: Joi.number(),
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

const validateLead = ({ body }, res, next) => {
  const { error } = leadSchema.validate(body);
  if (error) return res.status(400).json(error.details[0].message);

  next();
};

const validateLeadConference = ({ body }, res, next) => {
  const { error } = leadConfernceSchema.validate(body);
  if (error) return res.status(400).json(error.details[0].message);
  next();
};

module.exports = {
  validateLead,
  validateLeadConference,
};
