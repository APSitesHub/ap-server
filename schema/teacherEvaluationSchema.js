const Joi = require("joi");

const teacherEvaluationSchema = Joi.object({
  userId: Joi.string().required(),
  teacherClarityRating: Joi.number().integer().min(1).max(5).required(),
  lessonOrganizationRating: Joi.number().integer().min(1).max(5).required(),
  overallTeacherRating: Joi.number().integer().min(1).max(5).required(),
  additionalComments: Joi.string().allow("").optional(),
  submittedAt: Joi.string().isoDate().required(),
});

const validateTeacherEvaluation = ({ body }, res, next) => {
  const { error } = teacherEvaluationSchema.validate(body);

  if (error) {
    return res.status(400).json({ 
      success: false, 
      message: error.details[0].message 
    });
  }
  
  console.log("Teacher evaluation validated");
  next();
};

module.exports = {
  validateTeacherEvaluation,
};
