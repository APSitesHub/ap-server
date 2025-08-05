const IndividualUsers = require("../db/models/individualUsersModel");

const newIndividualUser = async (body) => await IndividualUsers(body).save();

const newMessage = async ({ chatId, message }) => {
  return await IndividualUsers.findOneAndUpdate(
    { chatId },
    { $push: { messagesHistory: message } },
    { new: true }
  );
};

const getByCrmId = async (crmId) => await IndividualUsers.findOne({ crmId });

const getAllUsersBySrmIds = async (crmIds) => {
  try {
    if (!Array.isArray(crmIds) || crmIds.length === 0) return [];

    const users = await IndividualUsers.find({
      crmId: { $in: crmIds },
    });

    return users;
  } catch (error) {
    console.error("Error in getAllUsersBySrmIds:", error.message);
    return [];
  }
};

module.exports = {
  newIndividualUser,
  newMessage,
  getByCrmId,
  getAllUsersBySrmIds,
};
