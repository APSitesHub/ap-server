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

async function updateLeadsByVisitedFields(statusIds) {
    try {
        console.log('Fetching leads...');
        const leads = await fetchLeadsByStatusAndPipeline(statusIds);
        console.log('Validating leads...');
        const validLeads = validateLeadsArray(leads);
        const threeDaysLater = Math.floor(new Date().getTime() / 1000);
        const leadsToUpdate = validLeads.map(lead => ({
            responsible_user_id: lead.responsible_user_id,
            task_type_id: 1,
            text: "останній візит студента був тиждень тому , набери спитай в чому справа  чому не відвідує",
            complete_till: threeDaysLater,
            entity_id: lead.id,
            entity_type: "leads",
            request_id: `task_${lead.id}`,
        }));

        console.log(`Number of valid leads: ${validLeads.length}`);
        console.log('Creating tasks...');

        for (let i = 0; i < leadsToUpdate.length; i += 200) {
            const batch = leadsToUpdate.slice(i, i + 200);
            try {
                await createTask(batch);
            } catch (error) {
                console.error(`Error creating tasks for batch starting at index ${i}:`, error);
                batch.forEach(task => console.error(`Failed task for lead ID: ${task.entity_id}`));
            }
        }
        console.log('Tasks created successfully.');
    } catch (error) {
        console.error('Error in updateLeadsByVisitedFields:', error);
    }
}

// async function fetchTasksByEntityIds(entityIds) {
//     try {
//         const currentToken = await getToken();
//         axios.defaults.headers.common.Authorization = `Bearer ${currentToken[0].access_token}`;
        
//         let allTasks = [];
//         let page = 1;
//         let hasMoreTasks = true;

//         while (hasMoreTasks) {
//             const response = await axios.get('https://apeducation.kommo.com/api/v4/tasks', {
//                 params: {
//                     'filter[entity_id][]': entityIds,
//                     'filter[entity_type]': 'leads',
//                     page,
//                     limit: 250,
//                 }
//             });

//             const tasks = response.data._embedded.tasks;
//             allTasks = allTasks.concat(tasks);

//             if (tasks.length < 250) {
//                 hasMoreTasks = false;
//             } else {
//                 page++;
//             }
//         }

//         const filteredTasks = allTasks.filter(task => task.text === "останній візит студента був тиждень тому , набери спитай в чому справа  чому не відвідує");

//         console.log(filteredTasks.length);
//         return filteredTasks;
//     } catch (error) {
//         console.error('Error fetching tasks:', error);
//         return [];
//     }
// }

// async function updateTaskCompleteTill(tasks, completeTill) {
    // try {
    //     const currentToken = await getToken();
    //     axios.defaults.headers.common.Authorization = `Bearer ${currentToken[0].access_token}`;

    //     for (let i = 0; i < tasks.length; i += 200) {
    //         const batch = tasks.slice(i, i + 200);
    //         const updatedTasks = batch.map(task => ({
    //             id: task.id,
    //             complete_till: completeTill,
    //         }));

    //         const response = await axios.patch(
    //             `https://apeducation.kommo.com/api/v4/tasks`,
    //             updatedTasks
    //         );

    //         console.log(`Updated ${response.data.length} tasks in batch starting at index ${i}`);
    //     }
    //     return true;
    // } catch (error) {
    //     console.error('Error updating tasks:', error);
    //     return false;
    // }
// }

// const fixTaskType = async (statusIds) => {
//     let leadsToUpdate = [];
//     const now = new Date();
//     now.setUTCHours(17, 0, 0, 0);
//     const completeTill = Math.floor(now.getTime() / 1000) + 2 * 3600;
//     try {
//         console.log('Fetching leads...');
//         const leads = await fetchLeadsByStatusAndPipeline(statusIds);
//         console.log('Validating leads...');
//         const validLeads = validateLeadsArray(leads);
//         leadsToUpdate = validLeads.map(lead => lead.id);
//         console.log(`Number of valid leads: ${validLeads.length}`);
//         console.log('Fetching tasks...');

//         const tasks = await fetchTasksByEntityIds(leadsToUpdate);
//         await updateTaskCompleteTill(tasks, completeTill);

//         console.log('Tasks updated successfully.');
//     } catch (error) {
//         console.error('Error in fixTaskType:', error);
//     }
// }

module.exports = {
    updateLeadsByVisitedFields,
}