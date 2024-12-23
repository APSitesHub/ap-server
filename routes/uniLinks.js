const express = require("express");

const { validateUniLinks } = require("../schema/uniLinksSchema");

const auth = require("../middlewares/streams/auth");
const getUniLinks = require("../controllers/uniLinks/getUniLinks");
const getOneUniLink = require("../controllers/uniLinks/getOneUniLink");
const addUniLinks = require("../controllers/uniLinks/addUniLinks");
const updateUniLinks = require("../controllers/uniLinks/updateUniLinks");

const router = express.Router();

router.get("/all", getUniLinks);

router.get("/", getOneUniLink);

router.post("/", auth, validateUniLinks, addUniLinks);

router.patch("/", auth, validateUniLinks, updateUniLinks);

module.exports = router;
