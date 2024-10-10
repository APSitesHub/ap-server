const express = require("express");

const {
  getAllAmbassadors,
  getAllCandidates,
} = require("../services/universityLeadsServices");

const postAmbassador = require("../middlewares/crm/postAmbassador");
const postCandidate = require("../middlewares/crm/postCandidate");

const { validateAmbassador } = require("../schema/ambassadorSchema");
const { validateCandidate } = require("../schema/candidateSchema");

const router = express.Router();

router.get("/amb", getAllAmbassadors);

router.get("/cand", getAllCandidates);

router.post("/amb", validateAmbassador, postAmbassador);

router.post("/cand", validateCandidate, postCandidate);

module.exports = router;
