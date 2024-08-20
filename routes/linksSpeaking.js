const express = require("express");

const { validateSpeakingLinks } = require("../schema/linksSpeakingSchema");

const auth = require("../middlewares/streams/auth");

const getLinks = require("../controllers/links/getLinks");
const addLinks = require("../controllers/links/addLinks");
const updateLinks = require("../controllers/links/updateLinks");
const getOneLink = require("../controllers/links/getOneLink");

const router = express.Router();

router.get("/all", getLinks);

router.get("/", getOneLink);

router.post("/", auth, validateSpeakingLinks, addLinks);

router.patch("/", auth, validateSpeakingLinks, updateLinks);

module.exports = router;
