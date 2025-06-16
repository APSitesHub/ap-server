const express = require("express");

const { validateWbUser } = require("../schema/wbUsersSchema");

const getAllWbUsers = require("../controllers/usersWebinar/getAllWbUsers");
const getWbUsersForRating = require("../controllers/usersWebinar/getWbUsersForRating");
const addWbUser = require("../controllers/usersWebinar/addWbUser");
const editWbUser = require("../controllers/usersWebinar/editWbUser");
const removeWbUser = require("../controllers/usersWebinar/removeWbUser");
const getWbUser = require("../controllers/usersWebinar/getWbUser");

const router = express.Router();

router.get("/admin", getAllWbUsers);

router.get("/rating", getWbUsersForRating);

router.get("/", getWbUser);

router.post("/new", validateWbUser, addWbUser);

router.delete("/:id", removeWbUser);

router.put("/:id", editWbUser);

module.exports = router;
