const {
  updatePedagogiumTimetable,
} = require("../../services/pedagogiumTimetableServices");

const editPedagogiumTimetableLesson = async (req, res) => {
  res.status(200).json(
    await updatePedagogiumTimetable(req.params.id, {
      $addToSet: { schedule: req.body },
    })
  );
};

module.exports = editPedagogiumTimetableLesson;
