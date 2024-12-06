const { allPlTeachers } = require("../../services/teachersServices");

const getAllTeachersPl = async (_, res) => {
  return res.json(await allPlTeachers());
};

module.exports = getAllTeachersPl;
