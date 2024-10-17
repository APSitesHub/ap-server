const { Schema, model } = require("mongoose");

const scUsers = new Schema(
  {
    userId: {
      type: String,
      required: [true, "No userId"],
    },
    name: { type: String },
    mail: {
      type: String,
      required: [true, "No mail"],
    },
    zoomMail: { type: String },
    crmId: { type: Number },
    contactId: { type: Number },
    adult: { type: Boolean },
    age: { type: String },
    lang: { type: String },
    course: { type: String },
    package: { type: String },
    visited: [String],
    visitedTime: [String],
    knowledge: { type: String },
    successRate: { type: String },
    temperament: { type: String },
    feedback: [String],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ScUsers = model("scusers", scUsers);

module.exports = ScUsers;
