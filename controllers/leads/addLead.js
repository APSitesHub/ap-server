const { newLead } = require("../../services/leadsServices");

const addLead = async (req, res) => res.status(201).json(await newLead(req.body));

module.exports = addLead;
