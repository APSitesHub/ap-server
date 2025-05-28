const axios = require('axios');
const getCRMLead = require('./crmGetLead');
const { getToken } = require('./tokensServices');
const { fromUnixTime, addMinutes, subMinutes, isWithinInterval } = require('date-fns');
const { toZonedTime } = require('date-fns-tz');
const { LinkMapTrial } = require('./webhook/altegioWebhookTrialLesson');

const idFiled = [
    1821801,
    1806904,
]
async function getTrialLessonInfo(id) {
    try {
        console.log('GET CRM DATA')
        // Get lead information from CRM
        const leadInfo = await getCRMLead(id);
        const lessonInfo = getFieldsByIds(leadInfo, idFiled);
        const isValidTime = isLessonTimeValid(lessonInfo);
        const link = getLinkBySlug(lessonInfo.CRMslug);
        if(isValidTime) {
           await setWasOnTrialLeson(leadInfo.id)  
        }
        console.log(`Лід ${leadInfo.id} ${leadInfo.name} спробував доєднатись до пробного ${lessonInfo.CRMslug} за посиланням ${link} `)
        return {link, message: 'Успішного навчання'};
    } catch (error) {
        console.error('Error getting trial lesson info:', error);
        throw error;
    }
}

function getFieldsByIds(lead, fieldIds) {
    const data = {
        datetimeStamp: null,
        CRMslug: null,
    }
    fieldIds.map(fieldId => {
      const field = lead.custom_fields_values.find(f => f.field_id === fieldId);
        if(field.field_id === 1806904) {
            data.datetimeStamp = field.values[0].value
        }
        if(field.field_id === 1821801) {
            data.CRMslug = field.values[0].value
        }
      return null;
    });
    return data;
  }

  function isLessonTimeValid(lessonInfo) {
    const kyivTimeZone = 'Europe/Kiev';
    // Convert the datetimeStamp to Unix time (milliseconds) if necessary
    const lessonDate = fromUnixTime(lessonInfo.datetimeStamp); // Assuming lessonInfo.datetimeStamp is in seconds
    // const lessonDateInKyiv = toZonedTime(lessonDate);
  
    const now = new Date();
    const nowInKyiv = toZonedTime(now, kyivTimeZone);
  
    const startInterval = subMinutes(lessonDate, 20);
    const endInterval = addMinutes(lessonDate, 60);
    console.log('lessonDateInKyiv', lessonDate);
    console.log('nowInKyiv', nowInKyiv);
    console.log('startInterval', startInterval);
    console.log('endInterval', endInterval);
    return isWithinInterval(nowInKyiv, { start: startInterval, end: endInterval });
}
// TODO need improve logic
function getLinkBySlug(CRMslug) {
    for (const language in LinkMapTrial) {
        for (const group in LinkMapTrial[language]) {
            for (const time in LinkMapTrial[language][group]) {
                if (LinkMapTrial[language][group][time].CRMslug === CRMslug) {
                    return LinkMapTrial[language][group][time].link;
                }
            }
        }
    }
    return null;
}

async function setWasOnTrialLeson(leadId) {
    const postRequest = {};
    postRequest.custom_fields_values = [
        {
          field_id: 1825885,
          field_name: "Був на пробному (групове)",
          values: [
            {
              value: 1,
            },
          ],
        },
      ];

    try {
      const currentToken = await getToken();
      
      axios.defaults.headers.common["Authorization"] = `Bearer ${currentToken[0].access_token}`;
  
      const crmLead = await axios.patch(
        `https://apeducation.kommo.com/api/v4/leads/${leadId}`,
        postRequest
      ).catch(err => {
        console.log(JSON.stringify(err.response.data));
        return null;
      });
      return crmLead;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
module.exports = getTrialLessonInfo;