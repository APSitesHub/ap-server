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
const postLeadEng = require("../controllers/quiz/postLeadEng.js");
const postLeadGer = require("../controllers/quiz/postLeadGer.js");
const postBodoCardLead = require("../controllers/leads/postBodoCardLead");
const postPaymentSignature = require("../controllers/leads/postPaymentSignature");
const postWayforPayCallback = require("../controllers/leads/postWayforPayCallback");
const {
  validateLead,
  validateLeadConference,
  validateLeadContract,
  validateLeadCertificate,
  validateLeadEvent,
  validateLeadFeedback,
} = require("../schema/leadSchema");
const { validateQuizLead } = require("../schema/quizLeadSchema");
const {
  validateQuizAuthCodeLead,
} = require("../schema/quizLeadAuthCodeSchema");
const getLeads = require("../controllers/leads/getLeads");
const getLeadsArray = require("../middlewares/crm/getLeadsArray");
const postHRLead = require("../middlewares/crm/postHRLead");
const postMCLead = require("../middlewares/crm/postMCLead");
const postLeadFeedback = require("../controllers/leads/postLeadFeedback.js");
const postLeadNMT = require("../controllers/quiz/postLeadNMT");
const postPartnerLeadNMT = require("../controllers/leads/postPartnerLeadNMT");
const postLeadWheelWin = require("../controllers/leads/postLeadWheelWin");
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

router.post("/feedback", validateLeadFeedback, postLeadFeedback)

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

router.post("/quiz-eng", postLeadEng);
router.post("/quiz-ger", postLeadGer);
router.post("/quiz-nmt", postLeadNMT);
router.post("/nmt-form", postPartnerLeadNMT);
router.post("/bodocard", postBodoCardLead);
router.post("/lead-payment", postPaymentSignature);
router.post("/wayforpay-callback", postWayforPayCallback);
router.post("/wheel-win", postLeadWheelWin);
module.exports = router;
