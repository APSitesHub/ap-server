const express = require("express");

const { validateSpeakingLinks } = require("../schema/linksSpeakingSchema");

const auth = require("../middlewares/streams/auth");

const getSpeakingLinks = require("../controllers/speakingLinks/getSpeakingLinks");
const getOneSpeakingLink = require("../controllers/speakingLinks/getOneSpeakingLink");
const addSpeakingLinks = require("../controllers/speakingLinks/addSpeakingLinks");
const updateSpeakingLinks = require("../controllers/speakingLinks/updateSpeakingLinks");

const router = express.Router();

router.get("/all", getSpeakingLinks);

router.get("/", getOneSpeakingLink);

router.post("/", auth, validateSpeakingLinks, addSpeakingLinks);

router.patch("/", auth, validateSpeakingLinks, updateSpeakingLinks);

module.exports = router;
