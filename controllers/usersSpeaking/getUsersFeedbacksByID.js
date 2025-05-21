const { getScUserFeedbackHistory } = require("../../services/scUsersServices");

const getUsersFeedbacksByID = async (req, res) => {
  return res.json(await getScUserFeedbackHistory(req.params.id));
};

module.exports = getUsersFeedbacksByID;
