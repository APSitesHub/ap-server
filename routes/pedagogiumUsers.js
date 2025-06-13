const express = require("express");

const checkUser = require("../middlewares/crm/checkUser.js");
// const updateLeadById = require("../middlewares/crm/updateLeadById.js");

const authUserAdmin = require("../middlewares/streams/authUserAdmin.js");

const authUniUser = require("../middlewares/uniStreams/authUniUser.js");
const getUniPlatformToken = require("../middlewares/platform/getUniPlatformToken.js");

const { validateUniUser } = require("../schema/pedagogiumUsersSchema.js");

const getUniUser = require("../controllers/pedagogiumUsers/getUniUser.js");
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


const router = express.Router();

router.get("/", authUniUser, getUniUser);

router.get("/admin", authUserAdmin, getAllUniUsers);

router.get("/admin/pedagogium", authUserAdmin, getAllPedagogiumUsers);

router.post("/new", validateUniUser, addUniUser);

router.delete("/:id", removeUniUser);

router.post("/login", validateUniUser, getUniPlatformToken, loginUniUser);

router.post(
  "/login/lesson",
  validateUniUser,
  getUniPlatformToken,
  loginUniUserLesson
);

router.post("/refresh", getUniPlatformToken, refreshUniUserToken);

router.post("/refresh/lesson", getUniPlatformToken, refreshUniUserTokenLesson);

router.put(
  "/:id",
  validateUniUser,
  checkUser,
  // updateLeadById,
  editUniUser
);

router.get("/attendance/pedagogium", getPedagogiumUsersAttendance);


module.exports = router;
