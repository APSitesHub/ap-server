const {
  findUniTimetable,
  updateUniTimetableWithoutCourse,
  updateUniTimetable,
  newUniTimetable,
} = require("../../services/uniTimetableServices");

const addUniTimetable = async (req, res) => {
  const { university, marathon } = req.body;
  const matchingTimetable = await findUniTimetable({ university, marathon });

  if (matchingTimetable && !matchingTimetable.course) {
    await updateUniTimetableWithoutCourse(matchingTimetable._id, {
      course: req.body.course,
    });
  }
  if (matchingTimetable) {
    return res
      .status(201)
      .json(await updateUniTimetable(matchingTimetable._id, req.body.schedule));
  }
  return res.status(201).json(await newUniTimetable(req.body));
};

module.exports = addUniTimetable;
