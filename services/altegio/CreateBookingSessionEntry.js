const axios = require("axios");
/**
 * Create a new booking session entry
 * @param {Object} requestBody - The request body.
 * @param {Object} requestBody.user - The user object.
 * @param {Object} requestBody.booking - The booking object.
 * @param {Object} requestBody.bookingSession - The booking session object.
 * @returns {Promise<Object>} - The response data containing the new booking session entry.
 */
async function CreateBookingSession ( requestBody ) {
    const companyId = process.env.ALTEGIO_COMPANY_ID;
    const companyToken = process.env.ALTEGIO_COMPANY_TOKEN;
    const apiUrl = `https://api.alteg.io/api/v1/book_record/${companyId}`;
    console.log(requestBody);
    // Extract data from request body

    // Prepare data for Python API call
    // const data = {
    //     phone: '+380-00-000-006', 
    //     fullname: 'chort',  
    //     comment: 'створено користувачем самостійно', 
    //     email: 'dev@mail.com',
    //     appointments: [{
    //     id: 123456,
    //     services: [ 12291769 ],
    //     staff_id: 2779383,
    //     datetime: '2025-01-27T12:00',
    //     }]
    // };
   const data =  {
    phone: "+1-315-555-0175",
    fullname: "James Smith",
    email: "j.smith@example.com",
    comment: "test entry!",
    api_id: "777",
    appointments: [{
        id: 1,
        services: [
            12291769
        ],
        staff_id: 2779383,
        datetime: "2025-01-27T12:00:00.000+03:00",
        custom_fields: {}
    },]
    }
    console.log(JSON.stringify(data))

    const response = await axios.post(apiUrl, JSON.stringify(data), {
        headers: {
            Accept: "application/vnd.api.v2+json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${companyToken}`,
        },
    }).catch((error) => {
        console.log(error.response.data)
        console.log(error.response.data.meta)
        return error
    });
    console.log('111111111111111111111111111111111111');
    console.log(response);
    console.log('111111111111111111111111111111111111');

    // Handle successful response

    return requestBody
}
module.exports = CreateBookingSession