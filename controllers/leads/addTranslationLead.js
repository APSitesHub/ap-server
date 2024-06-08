const { newTranslationLead } = require("../../services/leadsServices");

const addTranslationLead = async (req, res) =>
  res.status(201).json(await newTranslationLead(req.body));

module.exports = addTranslationLead;
