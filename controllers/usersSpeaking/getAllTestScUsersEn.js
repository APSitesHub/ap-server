const { allTestScEnUsers } = require("../../services/testScUsersServices");

const getAllTestScUsersEn = async (_, res) => {
  return res.json(await allTestScEnUsers());
};

module.exports = getAllTestScUsersEn;
