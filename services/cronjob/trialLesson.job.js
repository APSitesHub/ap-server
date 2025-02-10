const axios = require('axios');
const { getToken } = require("../tokensServices");

// Function to fetch clients from KommoCRM
async function fetchLeadsByStatusAndPipeline() {
    try {
        const currentToken = await getToken();
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${currentToken[0].access_token}`;
        const response = await axios.get('https://apeducation.kommo.com/api/v4/leads', {
            params: {
                filter: {
                    limit: 1000,
                    'filter[statuses][0]': [63191344],
                    'filter[pipeline_id]': [6453287] // Замініть на ID вашого пайплайну
                }
            }
        });
        console.log(response.data._embedded.leads);
        return response.data;
    } catch (error) {
        console.error('Error fetching leads:', error);
        return [];
    }
}

// Function to update client status
async function updateClientStatus(clientId, newStatus) {
    try {
        await axios.patch(`https://api.kommo.com/v4/clients/${clientId}`, {
            status: newStatus
        }, {
            headers: {
                'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
            }
        });
    } catch (error) {
        console.error(`Error updating status for client ${clientId}:`, error);
    }
}

// Cron job to check custom fields and update status
// cron.schedule('0 0 * * *', async () => {
//     const clients = await fetchClients();
//     const today = moment().format('YYYY-MM-DD');

//     for (const client of clients) {
//         const customFieldDate = client.custom_fields.find(field => field.name === 'YourCustomFieldName').value;
//         if (customFieldDate === today) {
//             await updateClientStatus(client.id, 'NewStatus');
//         }
//     }
// });

module.exports = {
    fetchLeadsByStatusAndPipeline,
    updateClientStatus
}