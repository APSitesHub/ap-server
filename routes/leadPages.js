const express = require("express");

const { validateLeadPage } = require("../schema/leadPageSchema");

const getLeadPages = require("../controllers/leadPage/getLeadPages");
const getLeadPage = require("../controllers/leadPage/getLeadPage");
const addLeadPage = require("../controllers/leadPage/addLeadPage");

const router = express.Router();

router.get("/", getLeadPages);

router.get("/:id", getLeadPage);

router.post("/", validateLeadPage, addLeadPage);

module.exports = router;
