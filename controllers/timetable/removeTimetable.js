const { deleteTimetable } = require("../../services/timetableServices");

const removeTimetable = async (req, res) => {
  res.status(204).json(await deleteTimetable(req.params.id));
};

module.exports = removeTimetable;
