const { allTestScDeUsers } = require("../../services/testScUsersServices");

const getAllTestScUsersDe = async (_, res) => {
  return res.json(await allTestScDeUsers());
};

module.exports = getAllTestScUsersDe;
