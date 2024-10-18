const { allTeachers } = require("../../services/teachersServices");

const getAllTeachers = async (_, res) => {
  return res.json(await allTeachers());
};

module.exports = getAllTeachers;
