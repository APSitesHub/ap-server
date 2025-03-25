const Answers = require("../db/models/answerModel");

const getAnswers = async () => await Answers.find({});

const newAnswer = async (body) => await Answers(body).save();

const findAnswersByQuery = async (query) => await Answers.find({ answer: query });

const findAnswersByQuestionID = async (id) => await Answers.find({ questionID: id });

const removeAnswersByQuestionID = async (id) =>
  await Answers.deleteMany({ questionID: id });

module.exports = {
  getAnswers,
  newAnswer,
  findAnswersByQuery,
  findAnswersByQuestionID,
  removeAnswersByQuestionID
};
