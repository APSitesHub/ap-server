const { allEnTeachers } = require("../../services/teachersServices");

const getAllTeachersEn = async (_, res) => {
  return res.json(await allEnTeachers());
};

module.exports = getAllTeachersEn;
