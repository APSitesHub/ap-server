const express = require("express");

const crmRefresh = require("../middlewares/crm/crmRefresh");
const postLead = require("../middlewares/crm/postLead");
const postLeadCertificate = require("../middlewares/crm/postLeadCertificate");
const prePostQuizLead = require("../middlewares/crm/prePostQuizLead");
const getLead = require("../middlewares/crm/getLead");
const getLeadAndPost = require("../middlewares/crm/getLeadAndPost");
const getAuthLeadAndPost = require("../middlewares/crm/getAuthLeadAndPost");
const updateQuizLead = require("../middlewares/crm/updateQuizLead");
const postQuizLead = require("../middlewares/crm/postQuizLead");
const postQuizLeadNoForm = require("../middlewares/crm/postQuizLeadNoForm");
const postConferenceLead = require("../middlewares/crm/postConfernceLead.js");
const updateContractLead = require("../middlewares/crm/updateContractLead.js");
const postLeadEvent = require("../middlewares/crm/postLeadEvent.js");

const {
  validateLead,
  validateLeadConference,
  validateLeadContract,
  validateLeadCertificate,
  validateLeadEvent,
} = require("../schema/leadSchema");
const { validateQuizLead } = require("../schema/quizLeadSchema");
const {
  validateQuizAuthCodeLead,
} = require("../schema/quizLeadAuthCodeSchema");

const getLeads = require("../controllers/leads/getLeads");
const getLeadsArray = require("../middlewares/crm/getLeadsArray");
const postHRLead = require("../middlewares/crm/postHRLead");
const postMCLead = require("../middlewares/crm/postMCLead");

const router = express.Router();

router.get("/", getLeads);

router.get("/arr", getLeadsArray);

router.post("/", validateLead, postLead, crmRefresh);

router.post("/hr", validateLead, postHRLead, crmRefresh);

router.post("/mc", validateLead, postMCLead, crmRefresh);

router.post(
  "/conference",
  validateLeadConference,
  postConferenceLead,
  crmRefresh,
);

router.post("/contract", validateLeadContract, updateContractLead, crmRefresh);
router.post(
  "/certificate",
  validateLeadCertificate,
  postLeadCertificate,
  crmRefresh,
);

router.post("/event", validateLeadEvent, postLeadEvent, crmRefresh);
router.patch(
  "/quiz/:id",
  validateQuizLead,
  updateQuizLead,
  getLeadAndPost,
  crmRefresh,
);

router.post("/quiz-one", postQuizLead, getLead, crmRefresh);

router.post("/quiz-int", prePostQuizLead, getLead, crmRefresh);

router.post("/quiz-code", postQuizLeadNoForm, getLead, crmRefresh);

router.patch(
  "/quiz-code/:id",
  validateQuizAuthCodeLead,
  updateQuizLead,
  getAuthLeadAndPost,
  crmRefresh,
);

module.exports = router;
