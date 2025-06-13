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
const getWSTIJOUsersAttendance = require("../controllers/pedagogiumUsers/getWSTIJOUsersAttendance.js");
const getWSBMIRUsersAttendance = require("../controllers/pedagogiumUsers/getWSBMIRUsersAttendance.js");
const getEWSPAUsersAttendance = require("../controllers/pedagogiumUsers/getEWSPAUsersAttendance.js");
const getAllPedagogiumUsers = require("../controllers/pedagogiumUsers/getAllPedagogiumUsers.js");
const getAllSSWUsers = require("../controllers/pedagogiumUsers/getAllSSWUsers.js");
const getAllMANSUsers = require("../controllers/pedagogiumUsers/getAllMANSUsers.js");
const getAllAHNSUsers = require("../controllers/pedagogiumUsers/getAllAHNSUsers.js");
const getAllANSWPUsers = require("../controllers/pedagogiumUsers/getAllANSWPUsers.js");
const getAllWSTIJOUsers = require("../controllers/pedagogiumUsers/getAllWSTIJOUsers.js");

const router = express.Router();

router.get("/", authUniUser, getUniUser);

router.get("/admin", authUserAdmin, getAllUniUsers);

router.get("/admin/pedagogium", authUserAdmin, getAllPedagogiumUsers);

router.get("/admin/wstijo", authUserAdmin, getAllWSTIJOUsers);

router.get("/admin/ssw", authUserAdmin, getAllSSWUsers);

router.get("/admin/mans", authUserAdmin, getAllMANSUsers);

router.get("/admin/ahns", authUserAdmin, getAllAHNSUsers);

router.get("/admin/answp", authUserAdmin, getAllANSWPUsers);

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
