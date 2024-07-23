const { updateTrialUser } = require("../../services/trialUsersServices");

const editTrialUser = async (req, res) => {
  res.status(200).json(await updateTrialUser(req.params.id, req.body));
};

module.exports = editTrialUser;
