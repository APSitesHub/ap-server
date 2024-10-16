const ScTest = require("../../db/models/testScUsersModel");

require("dotenv").config();

const updateTestScUser = async (req, res, next) => {
  try {
    const users = await ScTest.find({ feedback: { $type: "string" } });
    const regex = /[#*]{3,}|\b\d{1,}\.\d{1,}\.\d{2,}\b/g;

    users.forEach(async (document) => {
      const feedbackArray = (document.feedback + "")
        .split(regex)
        .map((str) => str.trim())
        .filter(Boolean);

      await ScTest.updateOne(
        { _id: document._id },
        { $set: { feedback: feedbackArray } }
      );
    });
  } catch (error) {
    console.log(error);
  }
  next();
};

module.exports = updateTestScUser;
