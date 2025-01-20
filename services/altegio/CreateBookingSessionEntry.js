/**
 * Create a new booking session entry
 * @param {Object} requestBody - The request body.
 * @param {Object} requestBody.user - The user object.
 * @param {Object} requestBody.booking - The booking object.
 * @param {Object} requestBody.bookingSession - The booking session object.
 * @returns {Promise<Object>} - The response data containing the new booking session entry.
 */
function CreateBookingSessionEntry ( requestBody ) {
    const user = requestBody.user;
    const booking = requestBody.booking;
    const bookingSession = requestBody.bookingSession;
    const companyId = process.env.ALTEGIO_COMPANY_ID;
    const companyToken = process.env.ALTEGIO_COMPANY_TOKEN;
}