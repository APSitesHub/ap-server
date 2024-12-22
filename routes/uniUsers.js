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
const refreshUniUserToken = require("../controllers/uniUsers/refreshUniUserToken.js");
const editUniUser = require("../controllers/uniUsers/editUniUser.js");

const router = express.Router();

router.get("/", authUniUser, getUniUser);

router.get("/admin", authUserAdmin, getAllUniUsers);

router.post("/new", validateUniUser, addUniUser);

router.delete("/:id", removeUniUser);

router.post("/login", validateUniUser, getUniPlatformToken, loginUniUser);

router.post("/refresh", getUniPlatformToken, refreshUniUserToken);

router.put(
  "/:id",
  validateUniUser,
  checkUser,
  // updateLeadById,
  editUniUser
);

module.exports = router;
