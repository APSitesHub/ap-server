const express = require("express");

const {
  validatePedagogiumKahoots,
} = require("../schema/pedagogiumKahootsSchema");

const auth = require("../middlewares/streams/auth");

const getKahoots = require("../controllers/pedagogiumHostKahoots/getKahoots");
const getOneKahoot = require("../controllers/pedagogiumHostKahoots/getOneKahoot");
const addKahoots = require("../controllers/pedagogiumHostKahoots/addKahoots");
const updateKahoots = require("../controllers/pedagogiumHostKahoots/updateKahoots");

const router = express.Router();

router.get("/all", getKahoots);

router.get("/:group", getOneKahoot);

router.post("/", auth, validatePedagogiumKahoots, addKahoots);

router.patch("/", validatePedagogiumKahoots, updateKahoots);

module.exports = router;
