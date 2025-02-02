const Joi = require("joi");

const uniLinksSchema = Joi.object({
  pedagogium_logistics: Joi.string().empty(""),
  pedagogium_prep: Joi.string().empty(""),
  wstijo_logistics: Joi.string().empty(""),
  wstijo_prep: Joi.string().empty(""),
  wsbmir_logistics: Joi.string().empty(""),
  wsbmir_prep: Joi.string().empty(""),
  ewspa_logistics: Joi.string().empty(""),
  ewspa_prep: Joi.string().empty(""),
  merito_logistics: Joi.string().empty(""),
  merito_prep: Joi.string().empty(""),
});

const validateUniLinks = ({ body }, res, next) => {
  const { error } = uniLinksSchema.validate(body);

  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validateUniLinks,
};
