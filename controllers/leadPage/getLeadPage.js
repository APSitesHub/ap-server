const { getLeadPageByCRMId } = require("../../services/leadPagesServices");

const getLeadPage = async (req, res) => {
  return res.json(await getLeadPageByCRMId(req.params.id));
};

module.exports = getLeadPage;
