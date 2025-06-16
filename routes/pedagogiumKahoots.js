const express = require("express");

const {
  validatePedagogiumKahoots,
} = require("../schema/pedagogiumKahootsSchema");

const auth = require("../middlewares/streams/auth");

const getKahoots = require("../controllers/pedagogiumKahoots/getKahoots");
const getOneKahoot = require("../controllers/pedagogiumKahoots/getOneKahoot");
const addKahoots = require("../controllers/pedagogiumKahoots/addKahoots");
const updateKahoots = require("../controllers/pedagogiumKahoots/updateKahoots");

const router = express.Router();

router.get("/all", getKahoots);

router.get("/:group", getOneKahoot);

router.post("/", auth, validatePedagogiumKahoots, addKahoots);

router.patch("/", validatePedagogiumKahoots, updateKahoots);

module.exports = router;
