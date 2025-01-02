const axios = require("axios");
const { DateTime } = require('luxon');

/**
 * Fetches available booking dates based on provided filters.
 *
 * @param {Object} filters - Query filters to refine the search for available dates.
 * @param {Array<number>} [filters.service_ids] - Array of service IDs to filter by.
 * @param {number} [filters.staff_id] - Staff ID to filter by.
 * @param {string} [filters.date] - Specific date in ISO 8601 format to filter by.
 * @param {string} [filters.date_from] - Start date for filtering (defaults to today).
 * @param {string} [filters.date_to] - End date for filtering (defaults to two weeks from today).
 * @returns {Promise<Object|null>} Returns an object containing working and booking dates, or `null` if an error occurs.
 */
async function GetAvailableDate(filters = {}) {
    const companyId = process.env.ALTEGIO_COMPANY_ID;
    const companyToken = process.env.ALTEGIO_COMPANY_TOKEN;
    const apiUrl = `https://api.alteg.io/api/v1/book_dates/${companyId}`;
    const queryParam = filters = {
        ...filters,
        date_from: DateTime.now().toISODate(),
        date_to: DateTime.now()
            .setZone('Europe/Kyiv')
            .plus({ weeks: 2 }).toISODate(),
    }

    console.log(queryParam);
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Accept: 'application/vnd.api.v2+json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${companyToken}`,
            },
            params: queryParam, // Filters such as service_ids[], staff_id, date, date_from, date_to
        });

        if (response.data.success) {
            // eslint-disable-next-line camelcase
            const { working_days, working_dates, booking_days, booking_dates } = response.data.data;

            // Logging data for debugging (optional)
            console.log('Working Days:', working_days);
            console.log('Working Dates:', working_dates);
            console.log('Booking Days:', booking_days);
            console.log('Booking Dates:', booking_dates);

            // Return the relevant data structure
            return {
                workingDays: working_days,
                workingDates: working_dates,
                bookingDays: booking_days,
                bookingDates: booking_dates,
            };
        } else {
            console.error('API call unsuccessful:', response.data);
            return null;
        }
    } catch (error) {
        console.error('Error fetching available dates:', error);
        return null;
    }
}

module.exports = GetAvailableDate;