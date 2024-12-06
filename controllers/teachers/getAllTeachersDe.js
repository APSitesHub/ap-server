const { allDeTeachers } = require("../../services/teachersServices");

const getAllTeachersDe = async (_, res) => {
  return res.json(await allDeTeachers());
};

module.exports = getAllTeachersDe;
