const express = require("express");

const crmRefresh = require("../middlewares/crm/crmRefresh");
const postLead = require("../middlewares/crm/postLead");
const prePostQuizLead = require("../middlewares/crm/prePostQuizLead");
const getLead = require("../middlewares/crm/getLead");
const getLeadAndPost = require("../middlewares/crm/getLeadAndPost");
const getAuthLeadAndPost = require("../middlewares/crm/getAuthLeadAndPost");
const updateQuizLead = require("../middlewares/crm/updateQuizLead");
const postQuizLead = require("../middlewares/crm/postQuizLead");
const postQuizLeadNoForm = require("../middlewares/crm/postQuizLeadNoForm");

const { validateLead } = require("../schema/leadSchema");
const { validateQuizLead } = require("../schema/quizLeadSchema");
const {
  validateQuizAuthCodeLead,
} = require("../schema/quizLeadAuthCodeSchema");

const getLeads = require("../controllers/leads/getLeads");
const getLeadsArray = require("../middlewares/crm/getLeadsArray");

const router = express.Router();

router.get("/", getLeads);

router.get("/arr", getLeadsArray);

router.post("/", validateLead, postLead, crmRefresh);

router.patch(
  "/quiz/:id",
  validateQuizLead,
  updateQuizLead,
  getLeadAndPost,
  crmRefresh
);

router.post("/quiz-one", postQuizLead, getLead, crmRefresh);

router.post("/quiz-int", prePostQuizLead, getLead, crmRefresh);

router.post("/quiz-code", postQuizLeadNoForm, getLead, crmRefresh);

router.patch(
  "/quiz-code/:id",
  validateQuizAuthCodeLead,
  updateQuizLead,
  getAuthLeadAndPost,
  crmRefresh
);

module.exports = router;
