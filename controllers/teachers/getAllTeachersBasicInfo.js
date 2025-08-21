const { allTeachersBasicInfo } = require("../../services/teachersServices");

const getAllTeachersBasicInfo = async (_, res) => {
  return res.json(await allTeachersBasicInfo());
};

module.exports = getAllTeachersBasicInfo;
