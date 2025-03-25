const { findAnswersByQuestionID } = require("../../services/answersServices");

const getAnswersByQuestion = async (req, res) => {
  return res.json(await findAnswersByQuestionID(req.params.id));
};

module.exports = getAnswersByQuestion;  