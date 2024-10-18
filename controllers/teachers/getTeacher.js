const { findTeacher } = require("../../services/teachersServices");

const getTeacher = async (req, res) => {
  return res.json(await findTeacher(req.body));
};

module.exports = getTeacher;
