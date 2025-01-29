const express = require("express");

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

router.post("/", validateLead, postLead);

router.post("/hr", validateLead, postHRLead);

router.post("/mc", validateLead, postMCLead);

router.post("/conference", validateLeadConference, postConferenceLead);

router.post("/contract", validateLeadContract, updateContractLead);
router.post("/certificate", validateLeadCertificate, postLeadCertificate);

router.post("/event", validateLeadEvent, postLeadEvent);
router.patch("/quiz/:id", validateQuizLead, updateQuizLead, getLeadAndPost);

router.post("/quiz-one", postQuizLead, getLead);

router.post("/quiz-int", prePostQuizLead, getLead);

router.post("/quiz-code", postQuizLeadNoForm, getLead);

router.patch(
  "/quiz-code/:id",
  validateQuizAuthCodeLead,
  updateQuizLead,
  getAuthLeadAndPost
);

module.exports = router;
