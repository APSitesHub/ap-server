const express = require("express");

const { validateUniKahoots } = require("../schema/uniKahootsSchema");

const auth = require("../middlewares/streams/auth");

const getUniKahoots = require("../controllers/uniKahoots/getUniKahoots");
const getOneUniKahoot = require("../controllers/uniKahoots/getOneUniKahoot");
const addUniKahoots = require("../controllers/uniKahoots/addUniKahoots");
const updateUniKahoots = require("../controllers/uniKahoots/updatUniKahoots");

const router = express.Router();

router.get("/all", getUniKahoots);

router.get("/", getOneUniKahoot);

router.post("/", auth, validateUniKahoots, addUniKahoots);

router.patch("/", auth, validateUniKahoots, updateUniKahoots);

module.exports = router;
