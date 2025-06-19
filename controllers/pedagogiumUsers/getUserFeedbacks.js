const { getUserFeedbacksById } = require("../../services/pedagogiumUsersServices");

const getUserFeedbacks = async (req, res) => {
  return res.json(await getUserFeedbacksById(req.params.id));
};

module.exports = getUserFeedbacks;
