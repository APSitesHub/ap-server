const express = require("express");

const { validateTours } = require("../schema/toursSchema");

const auth = require("../middlewares/streams/auth");

const getTours = require("../controllers/tours/getTours");
const addTours = require("../controllers/tours/addTours");
const updateTours = require("../controllers/tours/updateTours");

const router = express.Router();

router.get("/", getTours);

router.post("/", auth, validateTours, addTours);

router.patch("/:id", auth, validateTours, updateTours);

module.exports = router;
