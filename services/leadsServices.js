const Leads = require("../db/models/leadsModel");
const QuizAuthLeads = require("../db/models/quizLeadsAuthCodeModel");
const QuizLeads = require("../db/models/quizLeadsModel");
const TranslationLeads = require("../db/models/translationLeadsModel");

const getAllLeads = async () => await Leads.find({});

const newLead = async (body) => await Leads(body).save();

const newTrialLead = async (body) => await Leads(body).save();

const newTranslationLead = async (body) => await TranslationLeads(body).save();

const newQuizLead = async (body) => await QuizLeads(body).save();

const newQuizAuthLead = async (body) => await QuizAuthLeads(body).save();

module.exports = {
  getAllLeads,
  newLead,
  newQuizLead,
  newQuizAuthLead,
  newTrialLead,
  newTranslationLead,
};
