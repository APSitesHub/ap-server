const {
  updateOnlyUniTimetableInfo,
} = require("../../services/uniTimetableServices");

const editUniTimetableMarathon = async (req, res) => {
  const { marathon } = req.body;
  const updatedTimetable = { marathon };
  return res
    .status(204)
    .json(await updateOnlyUniTimetableInfo(req.params.id, updatedTimetable));
};

module.exports = editUniTimetableMarathon;
