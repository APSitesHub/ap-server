const { updateTimetable } = require("../../services/timetableServices");

const editTimetableLesson = async (req, res) => {
  res
    .status(200)
    .json(await updateTimetable(req.params.id, { $addToSet: { schedule: req.body } }));
};

module.exports = editTimetableLesson;
