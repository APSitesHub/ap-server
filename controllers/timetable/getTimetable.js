const { getAllTimetable } = require("../../services/timetableServices");

const getTimetable = async (_, res) => {
  return res.json(await getAllTimetable());
};

module.exports = getTimetable;
