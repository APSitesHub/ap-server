const Joi = require("joi");

const linksSchema = Joi.object({
  a0: Joi.string().empty(""),
  a0_2: Joi.string().empty(""),
  a1: Joi.string().empty(""),
  a2: Joi.string().empty(""),
  b1: Joi.string().empty(""),
  b2: Joi.string().empty(""),
  c1: Joi.string().empty(""),
  a1free: Joi.string().empty(""),
  a2free: Joi.string().empty(""),
  deutscha0: Joi.string().empty(""),
  deutscha0_2: Joi.string().empty(""),
  deutsch: Joi.string().empty(""),
  deutscha2: Joi.string().empty(""),
  deutschb1: Joi.string().empty(""),
  deutschb2: Joi.string().empty(""),
  deutschfree: Joi.string().empty(""),
  deutscha2free: Joi.string().empty(""),
  polskia0: Joi.string().empty(""),
  polskia0_2: Joi.string().empty(""),
  polskia0_3: Joi.string().empty(""),
  polski: Joi.string().empty(""),
  polskia2: Joi.string().empty(""),
  polskib1: Joi.string().empty(""),
  polskib2: Joi.string().empty(""),
  polskifree: Joi.string().empty(""),
  kidspre: Joi.string().empty(""),
  kidsbeg: Joi.string().empty(""),
  kidsmid: Joi.string().empty(""),
  kidshigh: Joi.string().empty(""),
  a0kids: Joi.string().empty(""),
  a1kids: Joi.string().empty(""),
  a2kids: Joi.string().empty(""),
  b1kids: Joi.string().empty(""),
  b2kids: Joi.string().empty(""),
  c1kids: Joi.string().empty(""),
  b1kidsbeginner: Joi.string().empty(""),
  b2kidsbeginner: Joi.string().empty(""),
  a1kidsfree: Joi.string().empty(""),
  dea0kids: Joi.string().empty(""),
  dea1kids: Joi.string().empty(""),
  dekidsfree: Joi.string().empty(""),
  pla1kids: Joi.string().empty(""),
  plkidsfree: Joi.string().empty(""),
  trials: Joi.string().empty(""),
  trials_de: Joi.string().empty(""),
  trials_pl: Joi.string().empty(""),
  trials_kids: Joi.string().empty(""),
  nmt_ukr: Joi.string().empty(""),
  nmt_en: Joi.string().empty(""),
  nmt_math: Joi.string().empty(""),
  nmt_history: Joi.string().empty(""),
  preschool: Joi.string().empty(""),
  test: Joi.string().empty(""),
  trendets: Joi.string().empty(""),
  apconf: Joi.string().empty(""),
});

const validateLinks = ({ body }, res, next) => {
  const { error } = linksSchema.validate(body);

  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validateLinks,
};
