const { Schema, model } = require("mongoose");

const webinarFeedbacks = new Schema(
  {
    id: {
      type: String,
      required: [true, "Id is required"],
    },
    teachername: {
      type: String,
    },
    lesson: {
      type: String,
      required: [true, "Lesson type is required"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    feedbacks: [
      {
        userId: {
          type: String,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          required: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const WebinarFeedbacks = model("webinarFeedbacks", webinarFeedbacks);

module.exports = WebinarFeedbacks;
