const { getPedagogiumAttendance } = require("../../services/pedagogiumUsersServices");

const getPedagogiumUsersAttendance = async (_, res) => {
  return res.json(await getPedagogiumAttendance());
};

module.exports = getPedagogiumUsersAttendance;
