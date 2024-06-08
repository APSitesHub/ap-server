const Joi = require("joi");

const tokenSchema = Joi.object({
  token_type: Joi.string().required(),
  expires_in: Joi.string().required(),
  access_token: Joi.string().required(),
  refresh_token: Joi.string().required(),
});

const validateTokens = ({ body }, res, next) => {
  const { error } = tokenSchema.validate(body);

  if (error) return res.status(error.status).json(error.details[0].message);

  next();
};

module.exports = {
  validateTokens,
};