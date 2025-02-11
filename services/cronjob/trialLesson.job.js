const axios = require('axios');
const { getToken } = require("../tokensServices");
const { isToday, fromUnixTime } = require('date-fns');

// Function to fetch clients from KommoCRM
async function fetchLeadsByStatusAndPipeline() {
    const PIPELINE_ID_SALES = 6453287;
    const STATUS_ID_TRIAL_YEAR = {
        ENGLISH: 63191344,
        POLISH: 63191352,
        GERMANY: 63191348,
    }
    try {
        const currentToken = await getToken();
      axios.defaults.headers.common.Authorization = `Bearer ${currentToken[0].access_token}`;
        const response = await axios.get('https://apeducation.kommo.com/api/v4/leads', {
            params: {
                limit:1000,
                'filter[statuses][0][pipeline_id]': PIPELINE_ID_SALES,
                'filter[statuses][0][status_id]': Object.values(STATUS_ID_TRIAL_YEAR),
            }
        });
        return response.data._embedded.leads;
    } catch (error) {
        console.error('Error fetching leads:', error);
        return [];
    }
}

// Function to update client status
async function updateStatus(lead) {
    try {
      const currentToken = await getToken();
      
      axios.defaults.headers.common.Authorization = `Bearer ${currentToken[0].access_token}`;
  
      const crmLead = await axios.patch(
        `https://apeducation.kommo.com/api/v4/leads`,
        lead
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

const isTrialLessonToday = (lead) => {
    const customFieldDate = lead.custom_fields_values.find(field => field.field_id === 1806904);
    if (customFieldDate) {
         const lessonDate = fromUnixTime(customFieldDate.values[0].value);
        return isToday(lessonDate);
    }
    return false;
};

const validateLeadsArray = (leads) => {
    try {
        return leads.filter(lead =>  lead.custom_fields_values && 
            Array.isArray(lead.custom_fields_values) && 
            lead.custom_fields_values.length > 0 && 
            lead.custom_fields_values.some(field => field.field_id === 1806904 && field.values[0].value)&&
            lead.custom_fields_values.some(field => field.field_id === 1826019 && field.values[0].value && field.values[0].value.includes('academy.ap.education')) &&
            lead.custom_fields_values.some(field => field.field_id === 1826055 && field.values[0].value === 'TRUE'));
    } catch (error) {
        console.error(error);
        return [];
    }
};

const isPresentOnTrialLesson = (lead) => {
    const trialLessonLink = lead.custom_fields_values.find(field => field.field_id === 1826019);
    const wasOnTrialLesson = lead.custom_fields_values.find(field => field.field_id === 1825885);
    if(!wasOnTrialLesson) {
        return false;
    }
    if ((trialLessonLink.values[0].value)) {
        return Boolean(+wasOnTrialLesson.values[0].value)
    }
    return false;
};

async function updateLeadsByTrialLessonFields () {
    const SERVICE_ID_WAS_ON_TRIAL = 58580615;
    const SERVICE_ID_NOT_ON_TRIAL = 58580611; 

    const leads = await fetchLeadsByStatusAndPipeline();
    const validLeads = validateLeadsArray(leads);
    const presentOnTrialLesson = [];
    const absenceOnTrialLesson = [];
    for (const lead of validLeads) {
        if(isTrialLessonToday(lead)) {
            isPresentOnTrialLesson(lead) ? presentOnTrialLesson.push(lead) : absenceOnTrialLesson.push(lead);
        }
    }
    const presentLeads = presentOnTrialLesson.map((lead) => {
        return {
            id: lead.id,
            status_id: SERVICE_ID_WAS_ON_TRIAL,
            custom_fields_values: [
                {
                    field_id: 1825885,
                    field_name: "Був на пробному (групове)",
                    values: [
                      {
                        value: "1",
                      },
                    ],
                  },
            ]
        }
    });

    const absencePromises = absenceOnTrialLesson.map((lead) => {
        return {
            id: lead.id,
            status_id: SERVICE_ID_NOT_ON_TRIAL,
            custom_fields_values: [
                {
                    field_id: 1825885,
                    field_name: "Був на пробному (групове)",
                    values: [
                      {
                        value: "0",
                      },
                    ],
                  },
            ]
        }
    });
    await Promise.all([updateStatus(presentLeads), updateStatus(absencePromises)]).catch(err => {
        console.error("CORN JOB with trial lesson error", err);
    });
};
 
module.exports = {
    updateLeadsByTrialLessonFields,
}