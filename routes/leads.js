const express = require("express");

const crmRefresh = require("../middlewares/crm/crmRefresh");
const postLead = require("../middlewares/crm/postLead");
const postQuizLead = require("../middlewares/crm/postQuizLead");
const prePostQuizLead = require("../middlewares/crm/prePostQuizLead");

const { validateLead } = require("../schema/leadSchema");
const { validateQuizLead } = require("../schema/quizLeadSchema");

const getLeads = require("../controllers/leads/getLeads");

const router = express.Router();

router.get("/", getLeads);

router.post("/", validateLead, postLead, crmRefresh);

router.post("/quiz", validateQuizLead, postQuizLead, crmRefresh);

router.post("/quiz-int", prePostQuizLead, crmRefresh);

module.exports = router;
