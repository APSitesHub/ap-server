const { findTrialUserByID, deleteTrialUser } = require("../../services/trialUsersServices");

const removeTrialUser = async (req, res) => {
  console.log(await findTrialUserByID(req.params.id));
  res.status(204).json(await deleteTrialUser(req.params.id));
};

module.exports = removeTrialUser;
