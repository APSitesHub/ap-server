const express = require("express");

const { validateCollections } = require("../schema/collectionsSchema");

const auth = require("../middlewares/streams/auth");

const updateCollections = require("../controllers/collections/updateCollections");
const addCollections = require("../controllers/collections/addCollections");
const getCollections = require("../controllers/collections/getCollections");

const router = express.Router();

router.get("/", getCollections);

router.post("/", auth, validateCollections, addCollections);

router.patch("/", auth, validateCollections, updateCollections);

module.exports = router;
