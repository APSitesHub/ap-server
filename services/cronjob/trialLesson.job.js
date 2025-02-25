const axios = require('axios');
const { getToken } = require("../tokensServices");
const { isToday, fromUnixTime } = require('date-fns');

// Function to fetch clients from KommoCRM
async function fetchLeadsByStatusAndPipeline(isReanimation = false) {
    const PIPELINE_ID_SALES = isReanimation ? 7891256 : 6453287;
    const STATUS_ID_TRIAL_YEAR = {
        ENGLISH: isReanimation ? 63642560 : 63191344,
        POLISH: isReanimation ? 63642552 : 63642556,
        GERMANY: isReanimation ? 63642552 : 63191348,
    }
    try {
        const currentToken = await getToken();
        axios.defaults.headers.common.Authorization = `Bearer ${currentToken[0].access_token}`;
        
        let allLeads = [];
        let page = 1;
        let hasMoreLeads = true;

        while (hasMoreLeads) {
            const response = await axios.get('https://apeducation.kommo.com/api/v4/leads', {
                params: {
                    'filter[statuses][0][pipeline_id]': PIPELINE_ID_SALES,
                    'filter[statuses][0][status_id]': Object.values(STATUS_ID_TRIAL_YEAR),
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
async function updateStatus(leads) {
    try {
        const currentToken = await getToken();
        axios.defaults.headers.common.Authorization = `Bearer ${currentToken[0].access_token}`;

        for (let i = 0; i < leads.length; i += 200) {
            const batch = leads.slice(i, i + 200);
            const response = await axios.patch(
                `https://apeducation.kommo.com/api/v4/leads`,
                batch
            ).catch(err => {
                console.error(JSON.stringify(err.response.data));
                return null;
            });
            console.log(`Updated ${response.data.length} leads in batch starting at index ${i}`);
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
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

async function updateLeadsByTrialLessonFields (isReanimation = false) {
    const SERVICE_ID_WAS_ON_TRIAL = isReanimation ? 71920164 : 58580615;
    const SERVICE_ID_NOT_ON_TRIAL = isReanimation ? 71920152 : 58580611; 

    const leads = await fetchLeadsByStatusAndPipeline(isReanimation);
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

    const absenceLeads = absenceOnTrialLesson.map((lead) => {
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

    await updateStatus(presentLeads);
    await updateStatus(absenceLeads);
};
 
module.exports = {
    updateLeadsByTrialLessonFields,
}