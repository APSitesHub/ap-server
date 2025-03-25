const { newAnswer } = require("../../services/answersServices");

const addAnswer = async (req, res) =>
  res.status(201).json(await newAnswer(req.body));
module.exports = addAnswer;
