const {
  getAllPedagogiumTimetable,
} = require("../../services/pedagogiumTimetableServices");

const getPedagogiumTimetable = async (_, res) => {
  return res.json(await getAllPedagogiumTimetable());
};

module.exports = getPedagogiumTimetable;
