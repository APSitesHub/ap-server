const { addUserFeedback } = require("../../services/pedagogiumUsersServices");

const updateUserFeedback = async (req, res) => {
  return res.status(201).json(await addUserFeedback(req.params.id, req.body));
};

module.exports = updateUserFeedback;
