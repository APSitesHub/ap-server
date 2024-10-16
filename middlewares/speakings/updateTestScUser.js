const ScTest = require("../../db/models/testScUsersModel");

require("dotenv").config();

const updateTestScUser = async (req, res, next) => {
  try {
    const users = await ScTest.find({ feedback: { $type: "string" } });
    console.log(users.length);

    users.forEach(async (document) => {
      // Split the feedback string based on the regex
      const feedbackArray = (document.feedback + "")
        .split(/[#*]{3,}/g)
        .map((str) => str.trim())
        .filter(Boolean);
      console.log(feedbackArray);

      // Update the document with the new array in the feedback field
      await ScTest.updateOne(
        { _id: document._id }, // Filter to update the specific document
        { $set: { feedback: feedbackArray } } // Set the new feedback value as an array
      );
    });
  } catch (error) {
    console.log(error);
  }
  next();
};

module.exports = updateTestScUser;
