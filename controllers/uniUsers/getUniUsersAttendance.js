const { getUniUsersAttendance } = require("../../services/uniUsersServices");

const getAttendance = async (_, res) => {
  return res.json(await getUniUsersAttendance());
};

module.exports = getAttendance;
