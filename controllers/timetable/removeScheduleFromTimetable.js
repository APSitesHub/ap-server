const {
  editSchedule,
  findTimetable,
} = require("../../services/timetableServices");

const removeScheduleFromTimetable = async (req, res) => {
  const timetableToUpdate = await findTimetable({ _id: req.params.id });
  const updatedSchedule = timetableToUpdate.schedule.filter(
    (lesson) => lesson._id.toString() !== req.body.scheduleId
  );
  return res
    .status(204)
    .json(await editSchedule(req.params.id, { schedule: updatedSchedule }));
};

module.exports = removeScheduleFromTimetable;
