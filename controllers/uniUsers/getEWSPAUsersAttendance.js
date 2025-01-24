const { getEWSPAAttendance } = require("../../services/uniUsersServices");

const getEWSPAUsersAttendance = async (_, res) => {
  return res.json(await getEWSPAAttendance());
};

module.exports = getEWSPAUsersAttendance;
