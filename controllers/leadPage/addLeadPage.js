const { newLeadPage } = require("../../services/leadPagesServices");

const addLeadPage = async (req, res) => res.status(201).json(await newLeadPage(req.body));

module.exports = addLeadPage;
