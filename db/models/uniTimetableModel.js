const { Schema, model } = require("mongoose");

const uniTimetable = new Schema(
  {
    university: {
      type: String,
      required: [true, "No university"],
    },
    marathon: {
      type: String,
      required: [true, "No marathon"],
    },
    schedule: [
      {
        day: { type: Number, required: [true, "No day number"] },
        time: { type: String, required: [true, "No lesson time"] },
        type: { type: String, required: [true, "No lesson type"] },
        lessonNumber: { type: String },
        topic: { type: String },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UniTimetable = model("unitimetable", uniTimetable);

module.exports = UniTimetable;
