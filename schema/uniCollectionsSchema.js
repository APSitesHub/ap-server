const Joi = require("joi");

const uniCollectionsSchema = Joi.object({
  pedagogium_logistics: Joi.string().empty(""),
  pedagogium_prep: Joi.string().empty(""),
  wstijo_logistics: Joi.string().empty(""),
  wstijo_prep: Joi.string().empty(""),
  wsbmir_logistics: Joi.string().empty(""),
  wsbmir_prep: Joi.string().empty(""),
});

const validateUniCollections = ({ body }, res, next) => {
  const { error } = uniCollectionsSchema.validate(body);

  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validateUniCollections,
};
