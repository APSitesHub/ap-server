const { updateTrialUser } = require("../../services/trialUsersServices");

const banTrialUser = async (req, res) => {
  res.status(200).json(await updateTrialUser(req.params.id, req.body));
};

module.exports = banTrialUser;
