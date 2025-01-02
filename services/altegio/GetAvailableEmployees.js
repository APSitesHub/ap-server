const axios = require('axios');

/**
 * Fetches a list of employees available for booking.
 *
 * @param {Array<number>} serviceIds - (Optional) An array of service IDs to filter by.
 * @param {string} datetime - (Optional) The ISO8601 format date to filter employees by service booking date.
 * @returns {Promise<Object>} - The response data containing available employees.
 */
async function GetAvailableEmployees(serviceIds = [], datetime = null) {
    const companyId = process.env.ALTEGIO_COMPANY_ID;
    const companyToken = process.env.ALTEGIO_COMPANY_TOKEN;
    const apiUrl = `https://api.alteg.io/api/v1/book_staff/${companyId}`;
    console.log(serviceIds);
    console.log(datetime);
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Accept: 'application/vnd.api.v2+json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${companyToken}`,
            },
            params: {
                service_ids: serviceIds,
                datetime: datetime || '',
            },
        }).catch(error => console.log(error));
        console.log(response);
        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error('API returned a failure status.');
        }
    } catch (error) {
        console.error('Error fetching available employees:', error.message);
        throw error;
    }
}

module.exports = {
    GetAvailableEmployees,
};
