const express = require("express");

const { validateUniCollections } = require("../schema/uniCollectionsSchema");

const auth = require("../middlewares/streams/auth");

const getUniCollections = require("../controllers/uniCollections/getUniCollections");
const addUniCollections = require("../controllers/uniCollections/addUniCollections");
const updateUniCollections = require("../controllers/uniCollections/updateUniCollections");

const router = express.Router();

router.get("/", getUniCollections);

router.post("/", auth, validateUniCollections, addUniCollections);

router.patch("/", auth, validateUniCollections, updateUniCollections);

module.exports = router;
