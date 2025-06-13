const { Schema, model } = require('mongoose');

const pedagogiumUsersSchema = new Schema({
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
    courseName: { type: String },
    visited: [String],
    visitedTime: [String],
    token: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  });

const PedagogiumUsers = model('pedagogiumusers', pedagogiumUsersSchema);

module.exports = PedagogiumUsers;
