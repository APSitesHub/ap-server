const Joi = require("joi");

const linksSchema = Joi.object({
  a0: Joi.string().empty(""),
  a1: Joi.string().empty(""),
  a2: Joi.string().empty(""),
  b1: Joi.string().empty(""),
  b2: Joi.string().empty(""),
  a1free: Joi.string().empty(""),
  a2free: Joi.string().empty(""),
  deutscha0: Joi.string().empty(""),
  deutsch: Joi.string().empty(""),
  deutscha2: Joi.string().empty(""),
  deutschfree: Joi.string().empty(""),
  deutscha2free: Joi.string().empty(""),
  polskia0: Joi.string().empty(""),
  polski: Joi.string().empty(""),
  polskia2: Joi.string().empty(""),
  polskifree: Joi.string().empty(""),
  a0kids: Joi.string().empty(""),
  a1kids: Joi.string().empty(""),
  a2kids: Joi.string().empty(""),
  b1kids: Joi.string().empty(""),
  b2kids: Joi.string().empty(""),
  b1kidsbeginner: Joi.string().empty(""),
  a1kidsfree: Joi.string().empty(""),
  trials: Joi.string().empty(""),
  trials_de: Joi.string().empty(""),
  trials_pl: Joi.string().empty(""),
  trials_kids: Joi.string().empty(""),
  test: Joi.string().empty(""),
});

const validateLinks = ({ body }, res, next) => {
  const { error } = linksSchema.validate(body);

  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validateLinks,
};
