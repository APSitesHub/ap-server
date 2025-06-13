const axios = require('axios');
const { getToken } = require('../../services/tokensServices');

async function postWayforPayCallback(req, res) {
    try {
        // Parse the JSON string from the key
        const paymentData = JSON.parse(Object.keys(req.body)[0]);
        console.log('WayforPay Callback Body:', paymentData);

        if (paymentData.transactionStatus === 'Approved') {
            const currentToken = await getToken();
            axios.defaults.headers.common.Authorization = `Bearer ${currentToken[0].access_token}`;
            const leadData = {
                name: paymentData.clientName,
                created_by: 0,
                pipeline_id: 6447058,
                status_id: 58735746, // Replace with your desired status ID
                _embedded: {
                    contacts: [
                        {
                            first_name: paymentData.clientName,
                            custom_fields_values: [
                                {
                                    field_code: "EMAIL",
                                    values: [{ value: paymentData.email }]
                                },
                                {
                                    field_code: "PHONE",
                                    values: [{ value: paymentData.phone }]
                                }
                            ]
                        }
                    ]
                },
                custom_fields_values: [
                    {
                        field_id: 1824857, // Replace with your payment amount field ID
                        values: [{ value: paymentData.amount }]
                    }
                ]
            };
            await axios.post('https://apeducation.kommo.com/api/v4/leads/complex', [leadData]);
        }

        res.status(200).send('Callback received and processed');
    } catch (error) {
        console.error('Error processing WayForPay callback:', error);
        res.status(500).send('Error processing callback');
    }
};

module.exports = postWayforPayCallback;