const Joi = require("joi");

const altegioAppointmentsSchema = Joi.object({
  appointmentId: Joi.string().required().messages({
    "any.required": "No appointmentId",
    "string.base": "appointmentId must be a string",
  }),
  leadId: Joi.string().required().messages({
    "any.required": "No leadId",
    "string.base": "leadId must be a string",
  }),
  teacherId: Joi.string().required().messages({
    "any.required": "No teacherId",
    "string.base": "teacherId must be a string",
  }),
  serviceId: Joi.string().required().messages({
    "any.required": "No serviceId",
    "string.base": "serviceId must be a string",
  }),
  startDateTime: Joi.date().required().messages({
    "any.required": "No startDateTime",
    "date.base": "startDateTime must be a valid date",
  }),
  endDateTime: Joi.date().required().messages({
    "any.required": "No endDateTime",
    "date.base": "endDateTime must be a valid date",
  }),
  available: Joi.boolean().default(true).messages({
    "boolean.base": "available must be a boolean",
  }),
});

const validateAltegioAppointment = ({ body }, res, next) => {
  const { error } = altegioAppointmentsSchema.validate(body);
  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validateAltegioAppointment,
};
