const ScTest = require("../db/models/testScUsersModel");

const allTestScUsers = async () => await ScTest.find({});

const newTestScUser = async (body) => await ScTest(body).save();

module.exports = {
  allTestScUsers,
  newTestScUser,
};
