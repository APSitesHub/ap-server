const express = require("express");

const crmRefresh = require("../middlewares/crm/crmRefresh");
const postLead = require("../middlewares/crm/postLead");

const { validateLead } = require("../schema/leadSchema");

const getLeads = require("../controllers/leads/getLeads");

const router = express.Router();

router.get("/", getLeads);

router.post("/", validateLead, postLead, crmRefresh);

module.exports = router;
