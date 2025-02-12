const getCRMLead = require("../crmGetLead");
const updateSalesAnalytics = async (crmId) => {
    const lead = await getCRMLead(crmId);
    
};

module.exports = {
    updateSalesAnalytics,
};