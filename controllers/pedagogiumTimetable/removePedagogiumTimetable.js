const {
  deletePedagogiumTimetable,
} = require("../../services/pedagogiumTimetableServices");

const removePedagogiumTimetable = async (req, res) => {
  console.log(6, req.params);

  res.status(204).json(await deletePedagogiumTimetable(req.params.id));
};

module.exports = removePedagogiumTimetable;
