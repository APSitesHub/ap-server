const { Schema, model } = require("mongoose");

const individualUsers = new Schema(
  {
    crmId: {
      type: String,
      required: [true, "No crmId"],
    },
    altegioId: {
      type: String,
    },
    chatId: {
      type: String,
    },
    viberChatId: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "No name"],
    },
    messagesHistory: [
      {
        messenger: {
          type: String,
          enum: ["viber", "telegram"],
        },
        datetime: { type: Date, required: [true, "No datetime"] },
        appointmentId: { type: String, required: [true, "No appointmentId"] },
        text: { type: String, required: [true, "No message text"] },
        isSent: {
          type: Boolean,
          required: [true, "isSent is required"],
        },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const IndividualUsers = model("individual-users", individualUsers);

module.exports = IndividualUsers;
