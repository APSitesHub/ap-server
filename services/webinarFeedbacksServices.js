const WebinarFeedbacks = require("../db/models/webinarFeedbacksModel");

const findWebinarById = async (id) => await WebinarFeedbacks.findOne({ id });

const newFeedback = async (webinarId, newFeedback) =>
  await WebinarFeedbacks.findOneAndUpdate(
    { id: webinarId },
    { $push: { feedbacks: newFeedback } }
  );

module.exports = {
  findWebinarById,
  newFeedback,
};
