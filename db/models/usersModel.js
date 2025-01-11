const { Schema, model } = require("mongoose");

const users = new Schema(
  {
    name: {
      type: String,
    },
    mail: {
      type: String,
      required: [true, "No mail"],
    },
    zoomMail: { type: String },
    password: {
      type: String,
      required: [true, "No password"],
    },
    crmId: { type: Number },
    contactId: { type: Number },
    pupilId: { type: String },
    marathonNumber: { type: String },
    adult: { type: Boolean },
    age: { type: String },
    lang: { type: String },
    course: { type: String },
    package: { type: String },
    visited: [String],
    visitedTime: [String],
    points: {
      type: String,
    },
    knowledge: {
      type: String,
    },
    manager: {
      type: String,
      required: [true, "No manager"],
    },
    token: {
      type: String,
    },
    isBanned: {
      type: Boolean,
    },
    authCode: { type: String },
    successRate: { type: String },
    temperament: { type: String },
    allow_online_booking: {
        type: Number, default: 0
    },
    available_online_booking: {
      type: Number, default: 0
    },
    online_booking_count: {
      type: Number, default: 0
    },
    onlineBookingHistory: [String],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Users = model("users", users);

module.exports = Users;
