const Joi = require("joi");

const leadPageSchema = Joi.object({
  crmId: Joi.number(),
  pageUrl: Joi.string(),
});

const validateLeadPage = ({ body }, res, next) => {
  console.log('validate', body);
  const { error } = leadPageSchema.validate(body);
  if (error) console.log('validate error', error);

  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validateLeadPage,
};
