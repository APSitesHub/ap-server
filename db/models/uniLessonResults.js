const { Schema, model } = require("mongoose");

const uniLessonResults = new Schema(
  {
    page: {
      type: String,
      required: [true, "Page is required"],
    },
    uniName: {
      type: String,
      required: [true, "University name is required"],
    },
    teacherName: {
      type: String,
      required: [true, "Teacher name is required"],
    },
    lessonName: {
      type: String,
      required: [true, "Lesson name is required"],
    },
    lessonNumber: {
      type: String,
      required: [true, "Lesson number is required"],
    },
    questions: [
      {
        questionId: {
          type: String,
          required: true,
        },
        correctAnswer: {
          type: String,
          required: true,
        },
        answers: [
          {
            userId: {
              type: String,
              required: true,
            },
            userName: {
              type: String,
              required: true,
            },
            answer: {
              type: String,
              required: true,
            },
            points: {
              type: Number,
              enum: [0, 1],
            },
          },
        ],
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UniLessonResults = model("unilessonresults", uniLessonResults);

module.exports = UniLessonResults;
