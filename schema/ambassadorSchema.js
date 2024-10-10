const Joi = require("joi");

const ambassadorSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(10).max(20).required(),
  tgusername: Joi.string().empty(""),
  tag: Joi.string().empty(""),
  course: Joi.string().required(),
  specialty: Joi.string().required(),
  lang: Joi.string().required(),
  level: Joi.string().required(),
  crmId: Joi.number(),
});

const validateAmbassador = ({ body }, res, next) => {
  const { error } = ambassadorSchema.validate(body);
  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validateAmbassador,
};
