const Ambassadors = require("../db/models/ambassadorsModel");
const Candidates = require("../db/models/candidatesModel");

const getAllAmbassadors = async () => await Ambassadors.find({});

const getAllCandidates = async () => await Candidates.find({});

const newAmbassador = async (body) => await Ambassadors(body).save();

const newCandidate = async (body) => await Candidates(body).save();

module.exports = {
  getAllAmbassadors,
  getAllCandidates,
  newAmbassador,
  newCandidate,
};
