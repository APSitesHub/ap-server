const { allTestScUsers } = require("../../services/testScUsersServices");

const getAllTestScUsers = async (_, res) => {
  return res.json(await allTestScUsers());
};

module.exports = getAllTestScUsers;
