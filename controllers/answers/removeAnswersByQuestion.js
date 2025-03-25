const { removeAnswersByQuestionID } = require("../../services/answersServices");

const removeAnswerByQuestion = async (req, res) => {
  return res.json(await removeAnswersByQuestionID(req.body.questionID));
};

module.exports = removeAnswerByQuestion;