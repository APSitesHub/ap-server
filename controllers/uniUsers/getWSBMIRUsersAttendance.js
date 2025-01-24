const { getWSBMIRAttendance } = require("../../services/uniUsersServices");

const getWSBMIRUsersAttendance = async (_, res) => {
  return res.json(await getWSBMIRAttendance());
};

module.exports = getWSBMIRUsersAttendance;
