const express = require("express");

const { validateUniHostKahoots } = require("../schema/uniHostKahootsSchema");

const auth = require("../middlewares/streams/auth");

const getUniHostKahoots = require("../controllers/uniHostKahoots/getUniHostKahoots");
const getOneUniHostKahoot = require("../controllers/uniHostKahoots/getOneUniHostKahoot");
const addUniHostKahoot = require("../controllers/uniHostKahoots/addUniHostKahoot");
const updateUniHostKahoots = require("../controllers/uniHostKahoots/updateUniHostKahoots");

const router = express.Router();

router.get("/all", getUniHostKahoots);

router.get("/", getOneUniHostKahoot);

router.post("/", auth, validateUniHostKahoots, addUniHostKahoot);

router.patch("/", auth, validateUniHostKahoots, updateUniHostKahoots);

module.exports = router;
