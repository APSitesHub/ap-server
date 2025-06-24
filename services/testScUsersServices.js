const ScTest = require("../db/models/testScUsersModel");

const allTestScUsers = async () =>
  await ScTest.find({}).select("_id name lang course feedback");

const allCourseTestScUsers = async (query) => {
  return await ScTest.find(
    {
      lang: { $regex: query.lang, $options: "i" },
      course: { $regex: query.course, $options: "i" },
    },
    {
      feedback: { $slice: -1 },
      visited: { $slice: -1 },
      visitedTime: { $slice: -1 },
    }
  );
};

const allTestScEnUsers = async () =>
  await ScTest.find({ $or: [{ lang: "en" }, { lang: "enkids" }] }).select(
    "_id name lang course feedback"
  );

const allTestScDeUsers = async () =>
  await ScTest.find({ $or: [{ lang: "de" }, { lang: "dekids" }] }).select(
    "_id name lang course feedback"
  );

const allTestScPlUsers = async () =>
  await ScTest.find({ $or: [{ lang: "pl" }, { lang: "plkids" }] }).select(
    "_id name lang course feedback"
  );

const newTestScUser = async (body) => await ScTest(body).save();

const updateTestScUser = async (query, body) =>
  await ScTest.findOneAndUpdate(query, body, { new: true });

const getTestScUserFeedbackHistory = async (id) =>
  // Using aggregate to match a user, filter his "feedback" field, and reduce it to unique values that include the regex pattern for date and time (dd.mm.yyyy, hh:mm:ss)
  await ScTest.aggregate([
    { $match: { userId: id } }, // Match one user by userId
    {
      $project: {
        // Project name and grades fields to include in the result
        name: 1,
        // Choose the "feedback" field to include in the result after filtering and deduplication
        feedback: {
          $let: {
            // Define the variable "filtered" as a filtered version of the "feedback" field
            vars: {
              filtered: {
                // Filter the "feedback" field to include only items that match the regex pattern for date and time (dd.mm.yyyy, hh:mm:ss)
                $filter: {
                  input: "$feedback", // Input array
                  as: "item", // Alias for each element in the array
                  cond: {
                    $regexMatch: {
                      // Use the variable "item" as the input for the regex match, it is the current element in the "feedback" array, as every element is a string
                      input: "$$item.text", // The text field of the feedback item
                      // Regex pattern to match date and time in the format dd.mm.yyyy, hh:mm:ss
                      regex: /\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}:\d{2}/,
                    },
                  },
                },
              },
            },
            // Start the reduce operation on the "filtered" array
            in: {
              // Use the "$reduce" operator to iterate over the "filtered" array
              $reduce: {
                input: "$$filtered", // The filtered feedback entries
                initialValue: [], // Start with an empty array
                in: {
                  // Use the "$cond" operator to check if the current element "this" is already in the accumulated value "value"
                  // If it is, return the accumulated value "value"
                  $cond: [
                    // Check if "this" is in "value"
                    {
                      $in: [
                        "$$this.text",
                        {
                          $map: {
                            input: "$$value",
                            as: "val",
                            in: "$$val.text",
                          },
                        },
                      ],
                    },
                    // If it is, return the accumulated value "value"
                    "$$value",
                    // If it is not, add "this" to the accumulated value "value"
                    { $concatArrays: ["$$value", ["$$this"]] },
                  ],
                },
              },
            },
          },
        },
      },
    },
  ]);

module.exports = {
  allTestScUsers,
  allTestScEnUsers,
  allTestScDeUsers,
  allTestScPlUsers,
  allCourseTestScUsers,
  newTestScUser,
  updateTestScUser,
  getTestScUserFeedbackHistory,
};
