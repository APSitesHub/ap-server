const { Schema, model } = require("mongoose");

const wbUsers = new Schema(
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
    crmId: { type: Number },
    contactId: { type: Number },
    lang: { type: String },
    course: { type: String },
    package: { type: String },
    visited: [String],
    visitedTime: [String],
    knowledge: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const WbUsers = model("wbusers", wbUsers);

module.exports = WbUsers;
