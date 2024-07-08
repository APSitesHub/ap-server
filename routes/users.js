const express = require("express");

const { validateUser } = require("../schema/usersSchema");

const authUser = require("../middlewares/streams/authUser");
const checkIsAdmin = require("../middlewares/streams/checkIsAdmin");
const checkUser = require("../middlewares/crm/checkUser");
const updateLeadById = require("../middlewares/crm/updateLeadById");
const getLeadDataFromCrm = require("../middlewares/crm/getLeadDataFromCrm");
const updateContactByLeadId = require("../middlewares/crm/updateContactByLeadId");
const changeLeadStatus = require("../middlewares/crm/changeLeadStatus");
const updateUserFromGifts = require("../middlewares/crm/updateUserFromGifts");

const addUser = require("../controllers/users/addUser");
const getUser = require("../controllers/users/getUser");
const getAllUsers = require("../controllers/users/getAllUsers");
const loginUser = require("../controllers/users/loginUser");
const refreshUserToken = require("../controllers/users/refreshUserToken");
const removeUser = require("../controllers/users/removeUser");
const banUser = require("../controllers/users/banUser");
const editUser = require("../controllers/users/editUser");
const editUserByCrmId = require("../controllers/users/editUserByCrmId");
const loginUserByAuthCode = require("../controllers/users/loginUserByAuthCode");
const refreshUserTokenByAuthCode = require("../controllers/users/refreshUserTokenByAuthCode");
const loginUserByAuthCodeFromDirect = require("../controllers/users/loginUserByAuthCodeFromDirect");
const addUserByCrmId = require("../controllers/users/addUserByCrmId");

const router = express.Router();

router.get("/", authUser, getUser);

router.get("/admin", checkIsAdmin, getAllUsers);

router.post("/new", validateUser, addUser);

router.delete("/:id", removeUser);

router.post("/login", validateUser, loginUser);

router.post("/refresh", refreshUserToken);

router.post("/login-code", loginUserByAuthCode, changeLeadStatus);

router.post("/login-direct", loginUserByAuthCodeFromDirect, changeLeadStatus);

router.post("/refresh-code", refreshUserTokenByAuthCode);

router.patch("/:id", banUser);

router.put("/:id", validateUser, checkUser, updateLeadById, editUser);

router.put(
  "/crm/:id",
  getLeadDataFromCrm,
  updateContactByLeadId,
  editUserByCrmId
);

router.put(
  "/crm-gifts/:id",
  getLeadDataFromCrm,
  updateUserFromGifts,
  addUserByCrmId
);

module.exports = router;
