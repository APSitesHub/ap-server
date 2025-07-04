const express = require("express");

const checkUser = require("../middlewares/crm/checkUser.js");
// const updateLeadById = require("../middlewares/crm/updateLeadById.js");

const authUserAdmin = require("../middlewares/streams/authUserAdmin.js");

const authUniUser = require("../middlewares/uniStreams/authUniUser.js");
const getUniPedagogiumPlatformToken = require("../middlewares/platform/getPedagogiumPlatformToken.js");

const { validateUniUser } = require("../schema/pedagogiumUsersSchema.js");

const getUniUser = require("../controllers/pedagogiumUsers/getUniUser.js");
const getUserFeedbacks = require("../controllers/pedagogiumUsers/getUserFeedbacks.js");
const getUsersByGroup = require("../controllers/pedagogiumUsers/getUsersByGroup.js");
const getAllUniUsers = require("../controllers/pedagogiumUsers/getAllUniUsers.js");
const addUniUser = require("../controllers/pedagogiumUsers/addUniUser.js");
const removeUniUser = require("../controllers/pedagogiumUsers/removeUniUser.js");
const loginUniUser = require("../controllers/pedagogiumUsers/loginUniUser.js");
const loginUniUserLesson = require("../controllers/pedagogiumUsers/loginUniUserLesson.js");
const refreshUniUserToken = require("../controllers/pedagogiumUsers/refreshUniUserToken.js");
const refreshUniUserTokenLesson = require("../controllers/pedagogiumUsers/refreshUniUserTokenLesson.js");
const editUniUser = require("../controllers/pedagogiumUsers/editUniUser.js");
const getPedagogiumUsersAttendance = require("../controllers/pedagogiumUsers/getPedagogiumUsersAttendance.js");
const getAllPedagogiumUsers = require("../controllers/pedagogiumUsers/getAllPedagogiumUsers.js");
const updateUserFeedback = require("../controllers/pedagogiumUsers/updateUserFeedback.js");

const router = express.Router();

router.get("/", getUniUser);

router.get("/feedbacks/:id", getUserFeedbacks);

router.get("/byGroup/:course/:group", getUsersByGroup);

router.get("/admin", authUserAdmin, getAllUniUsers);

router.get("/admin/pedagogium", authUserAdmin, getAllPedagogiumUsers);

router.patch("/feedback/:id", updateUserFeedback);

router.post("/new", validateUniUser, addUniUser);

router.delete("/:id", removeUniUser);

router.post(
  "/login",
  validateUniUser,
  getUniPedagogiumPlatformToken,
  loginUniUser
);

router.post(
  "/login/lesson",
  validateUniUser,
  getUniPedagogiumPlatformToken,
  loginUniUserLesson
);

router.post("/refresh", getUniPedagogiumPlatformToken, refreshUniUserToken);

router.post("/refresh/lesson", getUniPedagogiumPlatformToken, refreshUniUserTokenLesson);

router.put(
  "/:id",
  validateUniUser,
  checkUser,
  // updateLeadById,
  editUniUser
);

router.get("/attendance/pedagogium", getPedagogiumUsersAttendance);

module.exports = router;
