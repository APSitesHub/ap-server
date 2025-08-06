const Joi = require("joi");

const feedbackSchema = Joi.object({
  feedback: Joi.string().max(5000).optional().allow(''),
  improvements: Joi.string().max(5000).optional().allow('')
}).or('feedback', 'improvements'); // At least one field should be present

const validateFeedback = (req, res, next) => {
  const { error } = feedbackSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      success: false,
      message: "Validation error",
      error: error.details[0].message 
    });
  }
  next();
};

module.exports = { validateFeedback };
