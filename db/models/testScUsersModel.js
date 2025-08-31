const { Schema, model } = require("mongoose");

const testScUsers = new Schema(
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
    feedback: [
      {
        createdAt: { type: Date },
        text: { type: String },
        date: { type: String },
        activity: { type: Number },
        grammar: { type: Number },
        lexis: { type: Number },
        listening: { type: Number },
        speaking: { type: Number },
        grade: { type: Number },
        isOverdue: { type: Boolean },
      },
    ],
    grammar: { type: Number },
    lexis: { type: Number },
    speaking: { type: Number },
    listening: { type: Number },
    activity: { type: Number },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ScTest = model("sctest", testScUsers);

module.exports = ScTest;
