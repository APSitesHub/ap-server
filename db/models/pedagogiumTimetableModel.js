const { Schema, model } = require("mongoose");

const pedagogiumTimetable = new Schema(
  {
    group: {
      type: String,
      required: [true, "Group is required"],
    },
    schedule: [
      {
        day: { type: Number, required: [true, "No day number"] },
        time: { type: String, required: [true, "No lesson time"] },
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

const PedagogiumTimetable = model("pedagogiumtimetable", pedagogiumTimetable);

module.exports = PedagogiumTimetable;
