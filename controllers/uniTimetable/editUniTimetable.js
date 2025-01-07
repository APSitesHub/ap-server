const { updateUniTimetable } = require("../../services/uniTimetableServices");

const editUniTimetable = async (req, res) => {
  res.status(200).json(await updateUniTimetable(req.params.id, req.body));
};

module.exports = editUniTimetable;
