const getCRMLead = require("./crmGetLead");
const { LEAD_CUSTOM_FIELDS } = require("../utils/crm/constants");
const getCRMUser = require("./crmGetUser");
const formatDate = require("../utils/dateUtils");
const { google } = require("googleapis");
const axios = require("axios");
require("dotenv").config();
const { getToken } = require("./tokensServices");

const leadFeedback = async (leadId, answers) => {
  console.log(leadId, answers);
  console.log(answers[5]);
  console.log(answers[6]);
  const data = {
    lead_name: '',
    lead_tag: '',
    responsible_user: '',
    created_at: '',
    current_date: '',
    teacher_name: '',
    datetime_trial: '',
    q1_short: String(answers[0].shortanswer || ""),
    q2_short: String(answers[1].shortanswer || ""),
    q3_short: String(answers[2].shortanswer || ""),
    q4_short: String(answers[3].shortanswer || ""),
    q5_short: String(answers[4].shortanswer || ""),
    q6_rating: String(answers[5].rating || ""),
    q7_rating: String(answers[6].rating || ""),
    q1_long: String(answers[0].longanswer || ""),
    q2_long: String(answers[1].longanswer || ""),
    q3_long: String(answers[2].longanswer || ""),
    q4_long: String(answers[3].longanswer || ""),
    q5_long: String(answers[4].longanswer || ""),
    q6_long: String(answers[5].longanswer || ""),
    q7_long: String(answers[6].longanswer || ""),
  };
  if (leadId) {
    const lead = await getCRMLead(leadId);
    const managerId = lead.responsible_user_id;
    const teacherName = lead.custom_fields_values.find(
      (field) => field.field_id === LEAD_CUSTOM_FIELDS.TEACHER_ON_TRIAL.field_id
    ).values[0].value;
    const responsibleUser = await getCRMUser(managerId);
    data.lead_name = lead.name;
    data.lead_tag = lead._embedded.tags.map((tag) => tag.name).join(", ");
    data.responsible_user = responsibleUser.name;
    data.created_at = formatDate(lead.created_at);
    data.current_date = formatDate();
    data.teacher_name = teacherName;
    data.datetime_trial = null
  }
  const postBody = {
    custom_fields_values: [
      {
          field_id: 1826261,
          field_name: "Чи був урок для вас цікавим?",
          values: [
              {
                  value: data.q1_short
              }
          ]
      },
        {
          field_id: 1826263,
          field_name: "Чи вдалось вам засвоїти новий матеріал на пробному уроці?",
          values: [
              {
                  value: data.q2_short
              }
          ]
      },
      {
        field_id: 1826267,
        field_name: "Чи надав викладач відповіді на запитання про навчання, які вас цікавили?",
        values: [
            {
                value: data.q3_short
            }
        ]
      },
      {
        field_id: 1826271,
        field_name: "Чи надав менеджер повну інформацію про послуги, які вас цікавили?",
        values: [
            {
                value: data.q4_short
            } 
        ]
      },
      {
        field_id: 1826273,
        field_name: "Чи швидко менеджер реагував на ваші запити?",
        values: [
            {
                value:  data.q5_short
            }
        ]
      },
      {
        field_id: 1826269,
        field_name: "Чи були ви задоволені якістю консультації, яку надав менеджер?",
        values: [
            {
                value: data.q6_rating
            }
        ]
      },
      {
        field_id: 1826265,
        field_name: "Як ви оцінюєте професійність та підхід викладача під час пробного уроку?",
        values: [
            {
                value: data.q7_rating
            }
        ]
      },
      {
        field_id: 1826275,
        field_name: "Розг Чи був урок для вас цікавим?",
        values: [
            {
                value: data.q1_long
            }
        ]
      },
      {
        field_id: 1826277,
        field_name: "Розг Чи вдалось вам засвоїти новий матеріал на пробному уроці?",
        values: [
            {
                value: data.q2_long
            }
        ]
      },
      {
        field_id: 1826281,
        field_name: "Розг Чи надав викладач відповіді на запитання про навчання, які вас цікавили?",
        values: [
            {
                value: data.q3_long
            }
        ]
      },
      {
        field_id: 1826285,
        field_name: "Розг Чи надав менеджер повну інформацію про послуги, які вас цікавили?",
        values: [
            {
                value: data.q4_long
            }
        ]
      },
      {
        field_id: 1826287,
        field_name: "Розг Чи швидко менеджер реагував на ваші запити?",
        values: [
            {
                value: data.q5_long
            }
        ]
      },
      {
        field_id: 1826283,
        field_name: "Розг Чи були ви задоволені якістю консультації, яку надав менеджер?",
        values: [
            {
                value: data.q6_long
            }
        ]
      },
      {
        field_id: 1826279,
        field_name: "Розг Як ви оцінюєте професійність та підхід викладача під час пробного уроку?",
        values: [
            {
                value: data.q7_long
            }
        ]
      },
    ]
}
  await writeToGoogleSheet(data).catch(err => {
    console.error(`Error writing to Google Sheet: ${err}`);
  });
  await updateLeadFeedback(leadId, postBody).catch(err => {
    console.error(`Error updating lead feedback in CRM: ${err}`);
  });
};

async function writeToGoogleSheet(data) {
  const auth = new google.auth.GoogleAuth({
      credentials: {
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });


  await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID_FEEDBACK_SALES,
      range: `Аркуш1!A1`,
      valueInputOption: 'RAW',
      resource: {
          values: [Object.values(data)],
      },
  });
}

async function updateLeadFeedback(leadId, postBody) {
  try {
    const currentToken = await getToken();
    if(!leadId) {
      console.error("No leadId provided");
      return null;
    }
    axios.defaults.headers.common.Authorization = `Bearer ${currentToken[0].access_token}`;
    const crmLead = await axios.patch(
      `https://apeducation.kommo.com/api/v4/leads/${leadId}`,
      postBody
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

module.exports = leadFeedback;
