const { updateTimetable } = require("../../services/timetableServices");

const editTimetable = async (req, res) => {
  res.status(200).json(await updateTimetable(req.params.id, req.body));
};

module.exports = editTimetable;
