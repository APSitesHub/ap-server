const {
  findUniTimetable,
  editUniSchedule,
} = require("../../services/uniTimetableServices");

const removeScheduleFromUniTimetable = async (req, res) => {
  const timetableToUpdate = await findUniTimetable({ _id: req.params.id });
  const updatedSchedule = timetableToUpdate.schedule.filter(
    (lesson) => lesson._id.toString() !== req.body.scheduleId
  );
  return res
    .status(204)
    .json(await editUniSchedule(req.params.id, { schedule: updatedSchedule }));
};

module.exports = removeScheduleFromUniTimetable;
