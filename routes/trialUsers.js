const express = require("express");

const { validateTrialUser } = require("../schema/trialUsersSchema");

const getTrialUser = require("../controllers/trialUsers/getTrialUser");
const getAllTrialUsers = require("../controllers/trialUsers/getAllTrialUsers");
const addTrialUser = require("../controllers/trialUsers/addTrialUser");
const removeTrialUser = require("../controllers/trialUsers/removeTrialUser");
const loginTrialUser = require("../controllers/trialUsers/loginTrialUser");
const refreshTrialUserToken = require("../controllers/trialUsers/refreshTrialUserToken");
const banTrialUser = require("../controllers/trialUsers/banTrialUser");
const editTrialUser = require("../controllers/trialUsers/editTrialUser");
const authUser = require("../middlewares/streams/authUser");
const checkIsAdmin = require("../middlewares/streams/checkIsAdmin");

const router = express.Router();

router.get("/", authUser, getTrialUser);

router.get("/admin", checkIsAdmin, getAllTrialUsers);

router.post("/new", validateTrialUser, addTrialUser);

router.delete("/:id", removeTrialUser);

router.post("/login", validateTrialUser, loginTrialUser);

router.post("/refresh", refreshTrialUserToken);

router.patch("/:id", banTrialUser);

router.put("/:id", validateTrialUser, editTrialUser);

module.exports = router;
