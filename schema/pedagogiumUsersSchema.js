const Joi = require("joi");

const uniUserSchema = Joi.object({
  name: Joi.string(),
  mail: Joi.string().required(),
  password: Joi.string().required(),
  crmId: Joi.number(),
  contactId: Joi.number(),
  pupilId: Joi.string(),
  university: Joi.string(),
  group: Joi.string(),
  courseName: Joi.string(),
  points: Joi.string(),
  visited: Joi.array().items(Joi.string()),
  visitedTime: Joi.array().items(Joi.string()),
  token: Joi.string(),
});

const validateUniUser = ({ body }, res, next) => {
  const { error } = uniUserSchema.validate(body);

  if (error) return res.status(400).json(error.details[0].message);
  console.log("validated");
  next();
};

module.exports = {
  validateUniUser,
};
