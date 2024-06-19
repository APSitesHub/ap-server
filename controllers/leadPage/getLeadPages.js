const { getAllLeadPages } = require("../../services/leadPagesServices");

const getLeadPages = async (_, res) => {
  return res.json(await getAllLeadPages);
};

module.exports = getLeadPages;
