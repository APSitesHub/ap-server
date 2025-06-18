const {
  updatePedagogiumTimetable,
} = require("../../services/pedagogiumTimetableServices");

const editPedagogiumTimetable = async (req, res) => {
  res
    .status(200)
    .json(await updatePedagogiumTimetable(req.params.id, req.body));
};

module.exports = editPedagogiumTimetable;
