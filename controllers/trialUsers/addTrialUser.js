const { newTrialUser } = require("../../services/trialUsersServices");

const addTrialUser = async (req, res) => {
  console.log("addTrialUser", req.body);
  res.status(201).json(await newTrialUser({ ...req.body }));
};

module.exports = addTrialUser;
