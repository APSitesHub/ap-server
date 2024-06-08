const express = require("express");

const { validateKahoots } = require("../schema/kahootsSchema");

const auth = require("../middlewares/streams/auth");

const getKahoots = require("../controllers/kahoots/getKahoots");
const getOneKahoot = require("../controllers/kahoots/getOneKahoot");
const addKahoots = require("../controllers/kahoots/addKahoots");
const updateKahoots = require("../controllers/kahoots/updateKahoots");

const router = express.Router();

router.get("/all", getKahoots);

router.get("/", getOneKahoot);

router.post("/", auth, validateKahoots, addKahoots);

router.patch("/", auth, validateKahoots, updateKahoots);

module.exports = router;
