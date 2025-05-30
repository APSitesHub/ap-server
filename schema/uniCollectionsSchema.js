const Joi = require("joi");

const uniCollectionsSchema = Joi.object({
  pedagogium_logistics: Joi.string().empty(""),
  pedagogium_logistics_2: Joi.string().empty(""),
  pedagogium_prep: Joi.string().empty(""),
  wstijo_logistics: Joi.string().empty(""),
  wstijo_prep: Joi.string().empty(""),
  wsbmir_logistics: Joi.string().empty(""),
  wsbmir_prep: Joi.string().empty(""),
  ewspa_logistics: Joi.string().empty(""),
  ewspa_prep: Joi.string().empty(""),
  merito_logistics: Joi.string().empty(""),
  merito_prep: Joi.string().empty(""),
  merito_automation: Joi.string().empty(""),
  wstih_logistics: Joi.string().empty(""),
  wstih_prep: Joi.string().empty(""),
  wskm_logistics: Joi.string().empty(""),
  wskm_prep: Joi.string().empty(""),
  wssip_logistics: Joi.string().empty(""),
  wssip_prep: Joi.string().empty(""),
  wspa_logistics: Joi.string().empty(""),
  wspa_prep: Joi.string().empty(""),
  wse_logistics: Joi.string().empty(""),
  wse_prep: Joi.string().empty(""),
  eu: Joi.string().empty(""),
  ssw: Joi.string().empty(""),
  mans: Joi.string().empty(""),
  ahns: Joi.string().empty(""),
  answp: Joi.string().empty(""),
});

const validateUniCollections = ({ body }, res, next) => {
  const { error } = uniCollectionsSchema.validate(body);

  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validateUniCollections,
};
