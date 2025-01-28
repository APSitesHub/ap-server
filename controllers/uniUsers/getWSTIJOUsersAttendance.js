const { getWSTIJOAttendance } = require("../../services/uniUsersServices");

const getWSTIJOUsersAttendance = async (_, res) => {
  return res.json(await getWSTIJOAttendance());
};

module.exports = getWSTIJOUsersAttendance;
