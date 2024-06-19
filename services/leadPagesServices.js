const LeadPages = require("../db/models/leadPageModel");

const getAllLeadPages = async () => await LeadPages.find({});

const getLeadPageByCRMId = async (crmId) => await LeadPages.findOne(crmId);

const newLeadPage = async (body) => await LeadPages(body).save();

module.exports = {
  getAllLeadPages,
  getLeadPageByCRMId,
  newLeadPage,
};
