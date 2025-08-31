const mongoose = require("mongoose");
const ScTest = require("../db/models/testScUsersModel");
const connectDB = require("../db/connection");

async function calculateOverdueFeedbacks() {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    const users = await ScTest.find({
      feedback: {
        $exists: true,
        $not: { $size: 0 },
      },
    }).lean();

    console.log(`Found ${users.length} users with feedback`);

    await Promise.all(
      users.map(async (user) => {
        const feedbackWithOverdue = user.feedback.map((fb) => {
          const lessonDate = fb.text.match(
            /відгук за заняття (\d{1,2}\.\d{1,2}\.\d{4}):/
          );
          const feedbackDate = fb.text.match(
            /(\d{2}\.\d{2}\.\d{4}),\s*(\d{2}:\d{2}:\d{2})/
          );

          console.log(
            "lessonDate:",
            lessonDate[1],
            "feedbackDAte:",
            feedbackDate[1]
          );

          if (!lessonDate || !feedbackDate) return fb;

          const isOverdue =
            new Date(feedbackDate[1].split(".").reverse().join("-")) -
              new Date(lessonDate[1].split(".").reverse().join("-")) >
            4 * 86400000;

          console.log("isOverdue:", isOverdue);

          return { ...fb, isOverdue };
        });

        return await ScTest.updateOne(
          { _id: user._id },
          {
            $set: {
              feedback: feedbackWithOverdue,
            },
          }
        );
      })
    );

    console.log("Calculation completed");
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Calculation error:", error);
    process.exit(1);
  }
}

calculateOverdueFeedbacks();
