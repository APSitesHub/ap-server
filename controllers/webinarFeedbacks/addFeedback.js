const { newFeedback } = require("../../services/webinarFeedbacksServices");

const addFeedback = async (req, res) => {
  return res.json(await newFeedback(req.params.id, req.body));
};

module.exports = addFeedback;
