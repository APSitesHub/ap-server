const { findTrialUserByID } = require("../../services/trialUsersServices");

const getTrialUserByID = async (req, res) => {
  return res.json(await findTrialUserByID(req.params.id));
};

module.exports = getTrialUserByID;
