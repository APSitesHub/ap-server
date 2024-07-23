const { Schema, model } = require("mongoose");

const trialUsers = new Schema(
  {
    name: { type: String },
    lang: { type: String },
    visited: [String],
    visitedTime: [String],
    knowledge: { type: String },
    token: { type: String },
    isBanned: { type: Boolean },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const TrialUsers = model("trialUsers", trialUsers);

module.exports = TrialUsers;
