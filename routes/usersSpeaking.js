const express = require("express");

const checkIsAdmin = require("../middlewares/streams/checkIsAdmin");

const { validateScUser } = require("../schema/scUsersSchema");

const getAllScUsers = require("../controllers/usersSpeaking/getAllScUsers");
const addScUser = require("../controllers/usersSpeaking/addScUser");
const removeScUser = require("../controllers/usersSpeaking/removeScUser");
const editScUser = require("../controllers/usersSpeaking/editScUser");
const checkScUser = require("../middlewares/speakings/checkScUser");

const router = express.Router();

router.get("/admin", checkIsAdmin, getAllScUsers);

router.get("/:id", checkScUser);

router.post("/new", validateScUser, addScUser);

router.delete("/:id", removeScUser);

router.put("/:id", validateScUser, editScUser);

module.exports = router;