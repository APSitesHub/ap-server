const { allTrialUsers } = require("../../services/trialUsersServices");


const getAllTrialUsers = async (_, res) => {
  return res.json(await allTrialUsers());
};

module.exports = getAllTrialUsers;
