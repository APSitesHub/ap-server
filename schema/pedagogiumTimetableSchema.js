const Joi = require("joi");

const pedagogiumTimetableSchema = Joi.object({
  group: Joi.string().required(),
  schedule: Joi.array().items(
    Joi.object({
      day: Joi.number().required(),
      time: Joi.string().required(),
      lessonNumber: Joi.string().empty(""),
      topic: Joi.string().empty(""),
    })
  ),
});

const validatePedagogiumTimetable = ({ body }, res, next) => {
  const { error } = pedagogiumTimetableSchema.validate(body);
  if (error) return res.status(400).json(error.details[0].message);

  next();
};

const validateScheduleInPedagogiumTimetable = ({ body }, res, next) => {
  const { error } = pedagogiumTimetableSchema.validate(body.body);
  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validatePedagogiumTimetable,
  validateScheduleInPedagogiumTimetable,
};
