const getCRMLead  = require('../crmGetLead') // Adjust the path as needed
const getCRMUser  = require('../crmGetUser') 
async function getCRMUserName(leadId) {
    try {
        // Fetch the lead by ID
        const lead = await getCRMLead(leadId);
        if (!lead || !lead.responsible_user_id) {
            throw new Error('Lead or responsible user ID not found');
        }
        const user = await getCRMUser(lead.responsible_user_id);
        if (!user || !user.name) {
            throw new Error('User or user name not found');
        }
        // Return the user's name
        return user.name;
    } catch (error) {
        console.error('Error fetching CRM user name:', error.message);
        throw error;
    }
}

module.exports = getCRMUserName;