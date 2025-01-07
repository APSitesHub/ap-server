const Joi = require("joi");

const uniTimetableSchema = Joi.object({
  university: Joi.string().required(),
  marathon: Joi.string().required(),
  schedule: Joi.array().items(
    Joi.object({
      day: Joi.number().required(),
      time: Joi.string().required(),
      type: Joi.string().required(),
      lessonNumber: Joi.string().empty(""),
      topic: Joi.string().empty(""),
    })
  ),
});

const validateUniTimetable = ({ body }, res, next) => {
  const { error } = uniTimetableSchema.validate(body);
  if (error) return res.status(400).json(error.details[0].message);

  next();
};

const validateScheduleInUniTimetable = ({ body }, res, next) => {
  const { error } = uniTimetableSchema.validate(body.body);
  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validateUniTimetable,
  validateScheduleInUniTimetable,
};
