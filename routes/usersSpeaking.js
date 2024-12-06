const express = require("express");

const { validateScUser } = require("../schema/scUsersSchema");

const getUsersByCourse = require("../controllers/usersSpeaking/getUsersByCourse");
const getAllScUsers = require("../controllers/usersSpeaking/getAllScUsers");
const getAllScUsersEn = require("../controllers/usersSpeaking/getAllScUsersEn");
const getAllScUsersDe = require("../controllers/usersSpeaking/getAllScUsersDe");
const getAllScUsersPl = require("../controllers/usersSpeaking/getAllScUsersPl");
const addScUser = require("../controllers/usersSpeaking/addScUser");
const removeScUser = require("../controllers/usersSpeaking/removeScUser");
const editScUser = require("../controllers/usersSpeaking/editScUser");
const getScUsersForRating = require("../controllers/usersSpeaking/getScUsersForRating");

const checkScUser = require("../middlewares/speakings/checkScUser");
const updateLeadByIdFromSpeakings = require("../middlewares/crm/updateLeadByIdFromSpeakings");

const router = express.Router();

router.get("/", getUsersByCourse);

router.get("/admin", getAllScUsers);

router.get("/admin/en", getAllScUsersEn);

router.get("/admin/de", getAllScUsersDe);

router.get("/admin/pl", getAllScUsersPl);

router.get("/rating", getScUsersForRating);

router.get("/:id", checkScUser);

router.post("/new", validateScUser, addScUser);

router.delete("/:id", removeScUser);

router.put("/:id", editScUser);

router.patch("/:id", updateLeadByIdFromSpeakings, editScUser);

module.exports = router;
