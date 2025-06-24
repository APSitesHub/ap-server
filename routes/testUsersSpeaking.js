const express = require("express");

const { validateTestScUser } = require("../schema/testScUsersSchema");

const getAllTestScUsers = require("../controllers/usersSpeaking/getAllTestScUsers");
// const updateTestScUser = require("../middlewares/speakings/updateTestScUser");
const addTestScUser = require("../controllers/usersSpeaking/addTestScUser");
// const editScUser = require("../controllers/usersSpeaking/editScUser");
const editTestScUser = require("../controllers/usersSpeaking/editTestScUser");
const getTestUsersByCourse = require("../controllers/usersSpeaking/getTestUsersByCourse");
const getTestUsersFeedbacksByID = require("../controllers/usersSpeaking/getTestUsersFeedbacksByID");
const getAllTestScUsersEn = require("../controllers/usersSpeaking/getAllTestScUsersEn");
const getAllTestScUsersDe = require("../controllers/usersSpeaking/getAllTestScUsersDe");
const getAllTestScUsersPl = require("../controllers/usersSpeaking/getAllTestScUsersPl");

const router = express.Router();

router.get("/", getTestUsersByCourse);

router.get("/admin", getAllTestScUsers);

router.get("/admin/en", getAllTestScUsersEn);

router.get("/admin/de", getAllTestScUsersDe);

router.get("/admin/pl", getAllTestScUsersPl);

router.post("/new", validateTestScUser, addTestScUser);

router.patch("/:id", editTestScUser);

router.get("/feedback/:id", getTestUsersFeedbacksByID);

module.exports = router;
