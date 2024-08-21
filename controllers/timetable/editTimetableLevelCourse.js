const {
  updateOnlyTimetableInfo,
} = require("../../services/timetableServices");

const editTimetableLevelCourse = async (req, res) => {
  const { level, course } = req.body;
  const updatedTimetable = { level, course}
  return res
    .status(204)
    .json(await updateOnlyTimetableInfo(req.params.id, updatedTimetable));
};

module.exports = editTimetableLevelCourse;
