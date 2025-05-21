const ScUsers = require("../db/models/scUsersModel");

const allScUsers = async () =>
  await ScUsers.find({}).select("_id name lang course feedback");

const allScEnUsers = async () =>
  await ScUsers.find({ $or: [{ lang: "en" }, { lang: "enkids" }] }).select(
    "_id name lang course feedback"
  );

const allScDeUsers = async () =>
  await ScUsers.find({ $or: [{ lang: "de" }, { lang: "dekids" }] }).select(
    "_id name lang course feedback"
  );

const allScPlUsers = async () =>
  await ScUsers.find({ $or: [{ lang: "pl" }, { lang: "plkids" }] }).select(
    "_id name lang course feedback"
  );

const allCourseUsers = async (query) => {
  return await ScUsers.find({
    lang: { $regex: query.lang, $options: "i" },
    course: { $regex: query.course, $options: "i" },
  })
    .where("feedback")
    .slice(-1)
    .where("visited")
    .slice(-1)
    .where("visitedTime")
    .slice(-1);
};

const ratingScUsers = async () =>
  await ScUsers.find({})
    .select("_id name visitedTime lang course")
    .where("visitedTime")
    .slice(-1);

const findScUser = async (query) => await ScUsers.findOne(query);

const findScUserByID = async (id) => await ScUsers.findById(id);

const newScUser = async (body) => await ScUsers(body).save();

const deleteScUser = async (id) => await ScUsers.findByIdAndDelete(id);

const signInScUser = async (id, body) =>
  await ScUsers.findByIdAndUpdate(id, body, { new: true });

const updateScUser = async (query, body) =>
  await ScUsers.findOneAndUpdate(query, body, { new: true });

const updateScUserByCrmId = async (crmId, body) =>
  await ScUsers.findOneAndUpdate(crmId, body, { new: true });

const getScUserFeedbackHistory = async (id) =>
  // Using aggregate to match a user, filter his "feedback" field, and reduce it to unique values that include the regex pattern for date and time (dd.mm.yyyy, hh:mm:ss)
  await ScUsers.aggregate([
    { $match: { userId: id } }, // Match one user by userId
    {
      $project: {
        // Project name and grades fields to include in the result
        name: 1,
        activity: 1,
        grammar: 1,
        listening: 1,
        speaking: 1,
        lexis: 1,
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
                      input: "$$item",
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
                    { $in: ["$$this", "$$value"] },
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
  allScUsers,
  allScEnUsers,
  allScDeUsers,
  allScPlUsers,
  allCourseUsers,
  findScUser,
  findScUserByID,
  getScUserFeedbackHistory,
  newScUser,
  deleteScUser,
  signInScUser,
  updateScUser,
  updateScUserByCrmId,
  ratingScUsers,
};
