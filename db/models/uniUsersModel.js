const { Schema, model } = require("mongoose");

const uniUsers = new Schema(
  {
    name: { type: String },
    mail: {
      type: String,
      required: [true, "No mail"],
    },
    password: {
      type: String,
      required: [true, "No password"],
    },
    crmId: { type: Number },
    contactId: { type: Number },
    pupilId: { type: String },
    university: { type: String },
    group: { type: String },
    points: { type: String },
    visited: [String],
    visitedTime: [String],
    token: { type: String },
    pushNotificationTokens: [{ type: String }],
    locationHistory: [
      {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UniUsers = model("uniusers", uniUsers);

module.exports = UniUsers;
