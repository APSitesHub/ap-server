const { Schema, model } = require("mongoose");

const pedagogiumTeachers = new Schema(
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

const PedagogiumTeachers = model("pedagogiumTeachers", pedagogiumTeachers);

module.exports = PedagogiumTeachers;
