const { updateUniTimetable } = require("../../services/uniTimetableServices");

const editUniTimetableLesson = async (req, res) => {
  res
    .status(200)
    .json(
      await updateUniTimetable(req.params.id, {
        $addToSet: { schedule: req.body },
      })
    );
};

module.exports = editUniTimetableLesson;
