const Joi = require("joi");

const examLeadSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).max(20).required(),
  preferredCommunicator: Joi.string().valid("viber", "telegram", "whatsapp", "phone", "email").required(),
  exam: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.string().required()
  }).required(),
  // UTM fields (optional)
  utm_content: Joi.string().empty("").optional(),
  utm_medium: Joi.string().empty("").optional(),
  utm_campaign: Joi.string().empty("").optional(),
  utm_source: Joi.string().empty("").optional(),
  utm_term: Joi.string().empty("").optional(),
  utm_referrer: Joi.string().empty("").optional(),
  referrer: Joi.string().empty("").optional(),
  gclientid: Joi.string().empty("").optional(),
  gclid: Joi.string().empty("").optional(),
  fbclid: Joi.string().empty("").optional(),
});

const validateExamLead = (req, res, next) => {
  const { error } = examLeadSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = { validateExamLead };
