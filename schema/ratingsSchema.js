const Joi = require("joi");

const ratingsSchema = Joi.object({
  period: Joi.string().required(),
  rating: Joi.string().required(),
});

const validateRatings = ({ body }, res, next) => {
  const { error } = ratingsSchema.validate(body);

  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validateRatings,
};
