const {
  getTestScUserFeedbackHistory,
} = require("../../services/testScUsersServices");

const getTestUsersFeedbacksByID = async (req, res) => {
  return res.json(await getTestScUserFeedbackHistory(req.params.id));
};

module.exports = getTestUsersFeedbacksByID;
