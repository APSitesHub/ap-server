const { findWebinarById } = require("../../services/webinarFeedbacksServices");

const getWebinarById = async (req, res) => {
  return res.json(await findWebinarById(req.params.id));
};

module.exports = getWebinarById;
