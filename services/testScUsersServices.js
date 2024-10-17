const ScTest = require("../db/models/testScUsersModel");

const allTestScUsers = async () => await ScTest.find({});

const newTestScUser = async (body) => await ScTest(body).save();

const updateTestScUser = async (query, body) =>
  await ScTest.findOneAndUpdate(query, body, { new: true });

module.exports = {
  allTestScUsers,
  newTestScUser,
  updateTestScUser,
};
