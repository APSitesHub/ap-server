const { Schema, model } = require("mongoose");

const answers = new Schema(
  {
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    page: {
      type: String,
      required: [true, "Page is required"],
    },
    questionID: {
        type: String,
        required: [true, "Question ID is required"],
      },
    socketID: {
        type: String,
        required: [true, "Socket ID is required"],
      },
    userID: {
      type: String,
      required: [true, "User ID is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Answers = model("answers", answers);

module.exports = Answers;
