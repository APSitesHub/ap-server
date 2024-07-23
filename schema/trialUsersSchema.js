const Joi = require("joi");

const trialUserSchema = Joi.object({
  name: Joi.string(),
  lang: Joi.string(),
  visited: Joi.array().items(Joi.string()),
  visitedTime: Joi.array().items(Joi.string()),
  knowledge: Joi.string().empty(""),
  token: Joi.string(),
  isBanned: Joi.bool(),
});

const validateTrialUser = ({ body }, res, next) => {
  const { error } = trialUserSchema.validate(body);

  if (error) return res.status(400).json(error.details[0].message);
  console.log("validated");
  next();
};

module.exports = {
  validateTrialUser,
};
