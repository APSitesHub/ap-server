const {
  findPedagogiumTimetable,
  editPedagogiumSchedule,
} = require("../../services/pedagogiumTimetableServices");

const updateScheduleInPedagogiumTimetable = async (req, res) => {
  const timetableToUpdate = await findPedagogiumTimetable({
    _id: req.params.id,
  });
  const scheduleToUpdateIndex = timetableToUpdate.schedule.findIndex(
    (lesson) => lesson._id.toString() === req.body.lessonId
  );
  timetableToUpdate.schedule[scheduleToUpdateIndex] = {
    ...timetableToUpdate.schedule[scheduleToUpdateIndex],
    day: req.body.body.schedule[0].day,
    time: req.body.body.schedule[0].time,
    lessonNumber: req.body.body.schedule[0].lessonNumber,
    topic: req.body.body.schedule[0].topic,
  };
  return res.status(204).json(
    await editPedagogiumSchedule(req.params.id, {
      schedule: timetableToUpdate.schedule,
    })
  );
};

module.exports = updateScheduleInPedagogiumTimetable;
