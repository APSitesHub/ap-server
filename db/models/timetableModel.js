const { Schema, model } = require("mongoose");

const timetable = new Schema(
  {
    lang: {
      type: String,
      required: [true, "No language"],
    },
    level: {
      type: String,
      required: [true, "No level"],
    },
    schedule: [
      {
        day: { type: Number, required: [true, "No day number"] },
        time: { type: String, required: [true, "No lesson time"] },
        package: { type: String, required: [true, "No minimum package"] },
        type: { type: String, required: [true, "No lesson type"] },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Timetable = model("timetable", timetable);

module.exports = Timetable;
