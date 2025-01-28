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
    visited: [String],
    visitedTime: [String],
    token: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UniUsers = model("uniusers", uniUsers);

module.exports = UniUsers;
