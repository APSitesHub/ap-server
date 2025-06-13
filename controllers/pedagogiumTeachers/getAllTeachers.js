const { allTeachers } = require("../../services/pedagogiumTeachersServices");

const getAllTeachers = async (_, res) => {
  return res.json(await allTeachers());
};

module.exports = getAllTeachers;
