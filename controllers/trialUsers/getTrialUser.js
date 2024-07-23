const { findTrialUser } = require("../../services/trialUsersServices");

const getTrialUser = async (req, res) => {
  return res.json(await findTrialUser(req.body));
};

module.exports = getTrialUser;
