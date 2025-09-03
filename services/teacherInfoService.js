const getCRMLead = require("./crmGetLead");
const getCRMUser = require("./crmGetUser");

/**
 * Get teacher information by user ID through CRM API chain
 * Chain: userId (lead ID) -> lead -> responsible_user_id -> user -> name
 * 
 * @param {string|number} userId - User ID (actually lead ID in CRM)
 * @returns {Promise<Object|null>} - Teacher information or null if not found
 */
async function getTeacherInfoByUserId(userId) {
  try {
    if (!userId) {
      console.log('getTeacherInfoByUserId: userId is required');
      return null;
    }

    console.log(`Getting teacher info for userId: ${userId}`);

    // Step 1: Get lead by userId (which is actually lead ID)
    const lead = await getCRMLead(userId);
    if (!lead) {
      console.log(`Lead not found for userId: ${userId}`);
      return null;
    }

    console.log(`Lead found:`, {
      id: lead.id,
      name: lead.name,
      responsible_user_id: lead.responsible_user_id
    });

    // Step 2: Get responsible user ID from lead
    const responsibleUserId = lead.responsible_user_id;
    if (!responsibleUserId) {
      console.log(`No responsible_user_id found in lead: ${userId}`);
      return null;
    }

    // Step 3: Get user information by responsible_user_id
    const user = await getCRMUser(responsibleUserId);
    if (!user) {
      console.log(`User not found for responsible_user_id: ${responsibleUserId}`);
      return null;
    }

    console.log(`User found:`, {
      id: user.id,
      name: user.name,
      email: user.email
    });

    // Step 4: Return teacher information
    return {
      teacherId: user.id,
      teacherName: user.name,
      teacherEmail: user.email,
      leadId: lead.id,
      leadName: lead.name,
      responsibleUserId: responsibleUserId
    };

  } catch (error) {
    console.error('Error in getTeacherInfoByUserId:', error.message);
    return null;
  }
}

module.exports = {
  getTeacherInfoByUserId,
};
