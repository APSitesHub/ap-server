const Joi = require("joi");

const timetableSchema = Joi.object({
  lang: Joi.string().required(),
  level: Joi.string().required(),
  course: Joi.string().required(),
  schedule: Joi.array().items(
    Joi.object({
      day: Joi.number().required(),
      time: Joi.string().required(),
      package: Joi.string().required(),
      type: Joi.string().required(),
      lessonNumber: Joi.string().empty(""),
      teacher: Joi.string().empty(""),
    })
  ),
});

const validateTimetable = ({ body }, res, next) => {
  const { error } = timetableSchema.validate(body);
  if (error) return res.status(400).json(error.details[0].message);

  next();
};

const validateScheduleInTimetable = ({ body }, res, next) => {
  const { error } = timetableSchema.validate(body.body);
  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validateTimetable,
  validateScheduleInTimetable,
};
