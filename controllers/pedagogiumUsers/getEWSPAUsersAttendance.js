const { getEWSPAAttendance } = require("../../services/pedagogiumUsersServices");

const getEWSPAUsersAttendance = async (_, res) => {
  return res.json(await getEWSPAAttendance());
};

module.exports = getEWSPAUsersAttendance;
