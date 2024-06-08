const express = require("express");

const getRatings = require("../controllers/ratings/getRatings");
const addRatings = require("../controllers/ratings/addRatings");
const updateRatings = require("../controllers/ratings/updateRatings");

const router = express.Router();

router.get("/", getRatings);

router.post("/", addRatings);

router.patch("/", updateRatings);

module.exports = router;
