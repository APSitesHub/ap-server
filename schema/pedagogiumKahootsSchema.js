const Joi = require("joi");

const pedagogiumKahootsSchema = Joi.object({
  group: Joi.string().required(),
  links: Joi.array(),
});

const validatePedagogiumKahoots = ({ body }, res, next) => {
  const { error } = pedagogiumKahootsSchema.validate(body);
  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validatePedagogiumKahoots,
};
