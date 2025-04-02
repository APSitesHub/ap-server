const Joi = require("joi");

const linksSpeakingSchema = Joi.object({
  a0: Joi.string().empty(""),
  a0_2: Joi.string().empty(""),
  a1: Joi.string().empty(""),
  a2: Joi.string().empty(""),
  b1: Joi.string().empty(""),
  b2: Joi.string().empty(""),
  c1: Joi.string().empty(""),
  deutscha0: Joi.string().empty(""),
  deutscha0_2: Joi.string().empty(""),
  deutsch: Joi.string().empty(""),
  deutscha2: Joi.string().empty(""),
  deutschb1: Joi.string().empty(""),
  deutschb1_1: Joi.string().empty(""),
  deutschb1_2: Joi.string().empty(""),
  deutschb2: Joi.string().empty(""),
  deutschb2_1: Joi.string().empty(""),
  deutschb2_2: Joi.string().empty(""),
  deutschb2_3: Joi.string().empty(""),
  deutschc1: Joi.string().empty(""),
  polskia0: Joi.string().empty(""),
  polskia0_2: Joi.string().empty(""),
  polski: Joi.string().empty(""),
  polskia2: Joi.string().empty(""),
  polskib1: Joi.string().empty(""),
  polskib2: Joi.string().empty(""),
  polskic1: Joi.string().empty(""),
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
  dea0kids: Joi.string().empty(""),
  dea1kids: Joi.string().empty(""),
  dea2kids: Joi.string().empty(""),
  deb1kids: Joi.string().empty(""),
  pla1kids: Joi.string().empty(""),
  pla2kids: Joi.string().empty(""),
  nmt_ukr: Joi.string().empty(""),
  nmt_en: Joi.string().empty(""),
  nmt_math: Joi.string().empty(""),
  nmt_history: Joi.string().empty(""),
  preschool: Joi.string().empty(""),
});

const validateSpeakingLinks = ({ body }, res, next) => {
  const { error } = linksSpeakingSchema.validate(body);

  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validateSpeakingLinks,
};
