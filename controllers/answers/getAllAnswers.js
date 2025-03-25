const { getAnswers } = require("../../services/answersServices");

const getAllAnswers = async (_, res) => {
  return res.json(await getAnswers());
};

module.exports = getAllAnswers;