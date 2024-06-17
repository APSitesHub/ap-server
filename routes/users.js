const express = require("express");

const { validateUser } = require("../schema/usersSchema");

const authUser = require("../middlewares/streams/authUser");
const checkIsAdmin = require("../middlewares/streams/checkIsAdmin");
const checkUser = require("../middlewares/crm/checkUser");
const updateLeadById = require("../middlewares/crm/updateLeadById");

const addUser = require("../controllers/users/addUser");
const getUser = require("../controllers/users/getUser");
const getAllUsers = require("../controllers/users/getAllUsers");
const loginUser = require("../controllers/users/loginUser");
const refreshUserToken = require("../controllers/users/refreshUserToken");
const removeUser = require("../controllers/users/removeUser");
const banUser = require("../controllers/users/banUser");
const editUser = require("../controllers/users/editUser");

const router = express.Router();

router.get("/", authUser, getUser);

router.get("/admin", checkIsAdmin, getAllUsers);

router.post("/new", validateUser, addUser);

router.delete("/:id", removeUser);

router.post("/login", validateUser, loginUser);

router.post("/refresh", refreshUserToken);

router.patch("/:id", banUser);

router.put("/:id", validateUser, checkUser, updateLeadById, editUser);

module.exports = router;
