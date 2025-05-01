const express = require("express");

const checkUser = require("../middlewares/crm/checkUser.js");
// const updateLeadById = require("../middlewares/crm/updateLeadById.js");

const authUserAdmin = require("../middlewares/streams/authUserAdmin.js");

const authUniUser = require("../middlewares/uniStreams/authUniUser.js");
const getUniPlatformToken = require("../middlewares/platform/getUniPlatformToken.js");

const { validateUniUser } = require("../schema/uniUsersSchema.js");

const getUniUser = require("../controllers/uniUsers/getUniUser.js");
const getAllUniUsers = require("../controllers/uniUsers/getAllUniUsers.js");
const addUniUser = require("../controllers/uniUsers/addUniUser.js");
const removeUniUser = require("../controllers/uniUsers/removeUniUser.js");
const loginUniUser = require("../controllers/uniUsers/loginUniUser.js");
const loginUniUserLesson = require("../controllers/uniUsers/loginUniUserLesson.js");
const refreshUniUserToken = require("../controllers/uniUsers/refreshUniUserToken.js");
const refreshUniUserTokenLesson = require("../controllers/uniUsers/refreshUniUserTokenLesson.js");
const editUniUser = require("../controllers/uniUsers/editUniUser.js");
const getPedagogiumUsersAttendance = require("../controllers/uniUsers/getPedagogiumUsersAttendance.js");
const getWSTIJOUsersAttendance = require("../controllers/uniUsers/getWSTIJOUsersAttendance.js");
const getWSBMIRUsersAttendance = require("../controllers/uniUsers/getWSBMIRUsersAttendance.js");
const getEWSPAUsersAttendance = require("../controllers/uniUsers/getEWSPAUsersAttendance.js");
const getAllPedagogiumUsers = require("../controllers/uniUsers/getAllPedagogiumUsers.js");

const router = express.Router();

router.get("/", authUniUser, getUniUser);

router.get("/admin", authUserAdmin, getAllUniUsers);

router.get("/admin/pedagogium", authUserAdmin, getAllPedagogiumUsers);

router.get("/admin/ssw", authUserAdmin, getAllPedagogiumUsers);

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

router.get("/attendance/wstijo", getWSTIJOUsersAttendance);

router.get("/attendance/wsbmir", getWSBMIRUsersAttendance);

router.get("/attendance/ewspa", getEWSPAUsersAttendance);

module.exports = router;
