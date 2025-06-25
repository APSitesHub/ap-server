const { allTestScPlUsers } = require("../../services/testScUsersServices");

const getAllTestScUsersPl = async (_, res) => {
  return res.json(await allTestScPlUsers());
};

module.exports = getAllTestScUsersPl;
