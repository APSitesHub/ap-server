const express = require("express");

const crmRefresh = require("../middlewares/crm/crmRefresh");
const postTranslationLead = require("../middlewares/crm/postTranslationLead");

const { validateTranslationLead } = require("../schema/translationLeadSchema");

const getLeads = require("../controllers/leads/getLeads");

const router = express.Router();

router.get("/", getLeads);

router.post("/", validateTranslationLead, postTranslationLead, crmRefresh);

module.exports = router;
