const {
  newTimetable,
  findTimetable,
  updateTimetable,
  updateTimetableWithoutCourse,
} = require("../../services/timetableServices");

const addTimetable = async (req, res) => {
  const { lang, level } = req.body;
  const matchingTimetable = await findTimetable({ lang, level });
  if (!matchingTimetable.course) {
    await updateTimetableWithoutCourse(matchingTimetable._id, {
      course: req.body.course,
    });
  }
  if (matchingTimetable) {
    return res
      .status(201)
      .json(await updateTimetable(matchingTimetable._id, req.body.schedule));
  }
  return res.status(201).json(await newTimetable(req.body));
};

module.exports = addTimetable;
