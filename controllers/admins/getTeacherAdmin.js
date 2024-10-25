const { findTeacherAdmin } = require("../../services/adminsServices");

const getTeacherAdmin = async (_, res) => {
  return res.json(await findTeacherAdmin());
};

module.exports = getTeacherAdmin;
