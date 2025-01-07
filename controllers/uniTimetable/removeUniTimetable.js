const { deleteUniTimetable } = require("../../services/uniTimetableServices");

const removeUniTimetable = async (req, res) => {
  res.status(204).json(await deleteUniTimetable(req.params.id));
};

module.exports = removeUniTimetable;
