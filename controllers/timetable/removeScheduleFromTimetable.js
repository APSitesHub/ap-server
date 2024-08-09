const {
  deleteSchedule,
} = require("../../services/timetableServices");

const removeScheduleFromTimetable = async (req, res) => {
  console.log(req.body);
  console.log(req.params);
  console.log(req.body._id);
  return res
    .status(204)
    .json(await deleteSchedule(req.params.id, req.body._id));
};

module.exports = removeScheduleFromTimetable;
