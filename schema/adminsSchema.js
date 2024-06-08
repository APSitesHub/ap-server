const Joi = require("joi");

const adminUserSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});

const validateAdminUser = ({ body }, res, next) => {
  const { error } = adminUserSchema.validate(body);

  if (error) return res.status(error.status).json(error.details[0].message);

  next();
};

module.exports = {
  validateAdminUser,
};
