const { getPedagogiumAttendance } = require("../../services/uniUsersServices");

const getPedagogiumUsersAttendance = async (_, res) => {
  return res.json(await getPedagogiumAttendance());
};

module.exports = getPedagogiumUsersAttendance;
