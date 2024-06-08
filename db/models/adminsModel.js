const { Schema, model } = require("mongoose");

const admins = new Schema(
  {
    login: {
      type: String,
      required: [true, "No login"],
    },
    password: {
      type: String,
      required: [true, "No password"],
    },
    token: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Admins = model("admins", admins);

module.exports = Admins;
