const {
  editSchedule,
  findTimetable,
} = require("../../services/timetableServices");

const updateScheduleInTimetable = async (req, res) => {
  const timetableToUpdate = await findTimetable({ _id: req.params.id });
  const scheduleToUpdateIndex = timetableToUpdate.schedule.findIndex(
    (lesson) => lesson._id.toString() === req.body.lessonId
  );
  timetableToUpdate.schedule[scheduleToUpdateIndex] = {
    ...timetableToUpdate.schedule[scheduleToUpdateIndex],
    day: req.body.body.schedule[0].day,
    type: req.body.body.schedule[0].type,
    package: req.body.body.schedule[0].package,
    time: req.body.body.schedule[0].time,
    lessonNumber: req.body.body.schedule[0].lessonNumber,
    teacher: req.body.body.schedule[0].teacher,
  };
  return res.status(204).json(
    await editSchedule(req.params.id, {
      schedule: timetableToUpdate.schedule,
    })
  );
};

module.exports = updateScheduleInTimetable;
