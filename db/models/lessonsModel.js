const { Schema, model } = require("mongoose");

const lessons = new Schema(
  {
    marathonId: {
      type: String,
      required: [true, "No marathonId"],
    },
    lessonId: {
      type: String,
      required: [true, "No lessonId"],
    },
    marathonName: {
      type: String,
      required: [true, "No marathonName"],
    },
    lang: {
      type: String,
      required: [true, "No language"],
    },
    level: {
      type: String,
      required: [true, "No level"],
    },
    lesson: {
      type: String,
      required: [true, "No lesson number"],
    },
    topic: { type: String, required: [true, "No topic"] },
    keysEn: {
      type: String,
      required: [true, "No english keywords"],
    },
    keysUa: {
      type: String,
      required: [true, "No ukrainian keywords"],
    },
    pdf: [String],
    video: [String],
    faq: [
      {
        exercise: { type: String },
        question: { type: String },
        answer: { type: String },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Lessons = model("lessons", lessons);

module.exports = Lessons;
