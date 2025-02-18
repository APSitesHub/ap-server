const axios = require('axios');
const { getToken } = require("../tokensServices");
const { fromUnixTime, sub, addDays } = require('date-fns');

const PIPELINE_ID_SERVICES = 7001587;
// const STATUS_ID_CLOSE_TO_YOU = {
//     ENGLISH: 75659060,
//     POLISH: 75659068,
//     GERMANY: 75659064,
//     ENGLISH_KIDS: 65411360,
//     GERMANY_KIDS: 72736296,
// };

// Function to fetch clients from KommoCRM
async function fetchLeadsByStatusAndPipeline(statusIds) {
    try {
        const currentToken = await getToken();
        axios.defaults.headers.common.Authorization = `Bearer ${currentToken[0].access_token}`;
        
        let allLeads = [];
        let page = 1;
        let hasMoreLeads = true;

        while (hasMoreLeads) {
            const response = await axios.get('https://apeducation.kommo.com/api/v4/leads', {
                params: {
                    'filter[statuses][0][pipeline_id]': PIPELINE_ID_SERVICES,
                    'filter[statuses][0][status_id]': statusIds,
                    page,
                    limit: 250,
                }
            });

            const leads = response.data._embedded.leads;
            allLeads = allLeads.concat(leads);

            if (leads.length < 250) {
                hasMoreLeads = false;
            } else {
                page++;
            }
        }

        console.log(allLeads.length);
        return allLeads;
    } catch (error) {
        console.error('Error fetching leads:', error);
        return [];
    }
}

// Function to update client status
async function createTask(tasks) {
    try {
      const currentToken = await getToken();
      
      axios.defaults.headers.common.Authorization = `Bearer ${currentToken[0].access_token}`;
  
      const crmLead = await axios.post(
        `https://apeducation.kommo.com/api/v4/tasks`,
        tasks
      ).catch(err => {
        console.error(JSON.stringify(err.response.data));
        return null;
      });
      return crmLead;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

const validateLeadsArray = (leads) => {
    return leads.filter(lead => {
        const availableForCreateTask = lead.custom_fields_values.find(field => field.field_id === 1826323);
        const lastVisiting = lead.custom_fields_values.find(field => field.field_id === 1826097);
        const isAvailableForCreateTaskValid = !availableForCreateTask || availableForCreateTask.values[0].value !== 'TRUE';
        const isLastVisitingValid = !lastVisiting || !lastVisiting.values[0].value || fromUnixTime(lastVisiting.values[0].value) < sub(new Date(), { days: 10 });
        return isAvailableForCreateTaskValid && isLastVisitingValid;
    });
};

async function updateLeadsByVisitedFields (statusIds) {
    try {
        console.log('Fetching leads...');
        const leads = await fetchLeadsByStatusAndPipeline(statusIds);
        console.log('Validating leads...');
        const validLeads = validateLeadsArray(leads);
        const leadsToUpdate = [];
        const threeDaysLater = Math.floor(addDays(new Date(), 3).getTime() / 1000);
        validLeads.forEach(lead => {
            leadsToUpdate.push({
                responsible_user_id: lead.responsible_user_id, 
                task_type_id: 1,
                text: "останній візит студента був тиждень тому , набери спит в чому справа  чому не відвідує",
                complete_till: threeDaysLater,
                entity_id: lead.id,
                entity_type: "leads",
                request_id: `task_${lead.id}`,
            });
        });
        console.log(`Number of valid leads: ${validLeads.length}`);
        console.log('Creating tasks...');
        await createTask(leadsToUpdate);
        console.log('Tasks created successfully.');
    } catch (error) {
        console.error('Error in updateLeadsByVisitedFields:', error);
    }
};
 
module.exports = {
    updateLeadsByVisitedFields,
}