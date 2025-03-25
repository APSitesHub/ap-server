const Joi = require("joi");

const answerSchema = Joi.object({
  answer: Joi.string().min(1).required(),
  username: Joi.string().min(3).max(50).required(),
  page: Joi.string().min(10).max(20).required(),
  questionID: Joi.number().required(),
  socketID: Joi.string().required(),
  userID: Joi.string().required(),
});

const validateAnswer = ({ body }, res, next) => {
  const { error } = answerSchema.validate(body);
  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validateAnswer,
};
