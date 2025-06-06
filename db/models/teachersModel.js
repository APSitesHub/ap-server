const { Schema, model } = require("mongoose");

const teachers = new Schema(
  {
    name: {
      type: String,
    },
    login: {
      type: String,
      required: [true, "No login"],
    },
    password: {
      type: String,
      required: [true, "No password"],
    },
    lang: {
      type: String,
      required: [true, "No language"],
    },
    visited: [String],
    visitedTime: [String],
    token: {
      type: String,
    },
    platformId: {
      type: String,
    },
    altegioId: {
      type: Number,
    },
    crmId: {
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Teachers = model("teachers", teachers);

module.exports = Teachers;
