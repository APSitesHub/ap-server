const { getAllUniTimetable } = require("../../services/uniTimetableServices");

const getUniTimetable = async (_, res) => {
  return res.json(await getAllUniTimetable());
};

module.exports = getUniTimetable;
