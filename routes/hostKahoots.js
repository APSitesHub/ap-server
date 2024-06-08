const express = require("express");

const { validateHostKahoots } = require("../schema/hostKahootsSchema");

const auth = require("../middlewares/streams/auth");

const getHostKahoots = require("../controllers/hostKahoots/getHostKahoots");
const getOneHostKahoot = require("../controllers/hostKahoots/getOneHostKahoot");
const addHostKahoot = require("../controllers/hostKahoots/addHostKahoot");
const updateHostKahoots = require("../controllers/hostKahoots/updateHostKahoots");

const router = express.Router();

router.get("/all", getHostKahoots);

router.get("/", getOneHostKahoot);

router.post("/", auth, validateHostKahoots, addHostKahoot);

router.patch("/", auth, validateHostKahoots, updateHostKahoots);

module.exports = router;
