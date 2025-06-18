const {
  findPedagogiumTimetable,
  editPedagogiumSchedule,
} = require("../../services/pedagogiumTimetableServices");

const removeScheduleFromPedagoguimTimetable = async (req, res) => {
  const timetableToUpdate = await findPedagogiumTimetable({
    _id: req.params.id,
  });
  const updatedSchedule = timetableToUpdate.schedule.filter(
    (lesson) => lesson._id.toString() !== req.body.scheduleId
  );
  return res
    .status(204)
    .json(
      await editPedagogiumSchedule(req.params.id, { schedule: updatedSchedule })
    );
};

module.exports = removeScheduleFromPedagoguimTimetable;
