const Joi = require("joi");

const toursSchema = Joi.object({
  page: Joi.string().required(),
  link: Joi.string().required(),
});

const validateTours = ({ body }, res, next) => {
  const { error } = toursSchema.validate(body);

  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validateTours,
};
