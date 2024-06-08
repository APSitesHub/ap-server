const { getAllLeads } = require("../../services/leadsServices");

const getLeads = async (_, res) => {
  return res.json(await getAllLeads());
};

module.exports = getLeads;
