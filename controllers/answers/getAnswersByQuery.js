const { findAnswersByQuery } = require("../../services/answersServices");

const getAnswersByQuery = async (req, res) => {
  const { answer } = req.query;
  return res.json(await findAnswersByQuery(answer));
};

module.exports = getAnswersByQuery;
