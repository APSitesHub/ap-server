const AltegioAppointments = require("../db/models/altegioAppointments");

/**
 * Get teacher information by user ID from Altegio appointments database
 * Gets the most recent appointment for the user and extracts teacher information
 * 
 * @param {string|number} userId - User ID (lead ID)
 * @returns {Promise<Object|null>} - Teacher information or null if not found
 */
async function getTeacherInfoByUserId(userId) {
  try {
    if (!userId) {
      console.log('getTeacherInfoByUserId: userId is required');
      return null;
    }

    console.log(`Getting teacher info from appointments for userId: ${userId}`);

    // Find the most recent appointment for this user/lead
    const latestAppointment = await AltegioAppointments.findOne({
      leadId: userId.toString()
    })
    .sort({ startDateTime: -1 }) // Sort by start date descending (most recent first)
    .select('leadId leadName teacherId teacherName startDateTime serviceName')
    .lean(); // Use lean() for better performance

    if (!latestAppointment) {
      console.log(`No appointments found for userId: ${userId}`);
      return null;
    }

    console.log(`Latest appointment found:`, {
      leadId: latestAppointment.leadId,
      leadName: latestAppointment.leadName,
      teacherId: latestAppointment.teacherId,
      teacherName: latestAppointment.teacherName,
      startDateTime: latestAppointment.startDateTime,
      serviceName: latestAppointment.serviceName
    });

    // Return teacher information from the latest appointment
    return {
      teacherId: latestAppointment.teacherId || 'Unknown ID',
      teacherName: latestAppointment.teacherName || 'Unknown Teacher',
      teacherEmail: null, // Not available in appointments
      leadId: latestAppointment.leadId,
      leadName: latestAppointment.leadName || 'Unknown Lead',
      lastAppointmentDate: latestAppointment.startDateTime,
      lastServiceName: latestAppointment.serviceName
    };

  } catch (error) {
    console.error('Error in getTeacherInfoByUserId:', error.message);
    return null;
  }
}

module.exports = {
  getTeacherInfoByUserId,
};
