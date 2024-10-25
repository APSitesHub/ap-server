const { findTeacher } = require("../../services/teachersServices");

const getOneTeacher = async (req, res) => {
  return res.json(await findTeacher(req.body));
};

module.exports = getOneTeacher;
