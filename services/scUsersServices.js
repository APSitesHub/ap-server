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

module.exports = {
  allScUsers,
  allScEnUsers,
  allScDeUsers,
  allScPlUsers,
  allCourseUsers,
  findScUser,
  findScUserByID,
  newScUser,
  deleteScUser,
  signInScUser,
  updateScUser,
  updateScUserByCrmId,
  ratingScUsers,
};
