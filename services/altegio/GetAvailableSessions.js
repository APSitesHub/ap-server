const axios = require("axios");

/**
 * Fetches available booking sessions based on provided filters.
 *
 * @param {Object} filters - Query filters to refine the search for available dates.
 * @param {Array<number>} [filters.service_ids] - Array of service IDs to filter by.
 * @param {number} [filters.staffId] - Staff ID to filter by.
 * @param {string} [filters.datetime] - Specific date in ISO 8601 format to filter by.
 * @returns {Promise<Object|null>} Returns an object containing working and booking dates, or `null` if an error occurs.
 */
async function GetAvailableSessions(filters = {}) {
    console.log(filters);
    const companyId = process.env.ALTEGIO_COMPANY_ID;
    const companyToken = process.env.ALTEGIO_COMPANY_TOKEN;
    const apiUrl = `https://api.alteg.io/api/v1/book_times/${companyId}/${filters.staffId}/${filters.datetime}`;
    const queryParam = filters = {
        ...filters,
    }


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
            console.log(response.data.data);
            return response.data.data
        } else {
            console.error('API call unsuccessful:', response.data);
            return null;
        }
    } catch (error) {
        console.error('Error fetching available sessions:', error);
        return null;
    }
}

module.exports = GetAvailableSessions;