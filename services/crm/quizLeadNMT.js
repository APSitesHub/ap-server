const axios = require("axios");
const { google } = require("googleapis");
const { getToken } = require("../tokensServices");

// Add Google Sheets configuration
const SPREADSHEET_ID = '1uHq062nfYHlMtaGif9bvD3aG44M76ht9_K5v8au5qNA';
const SHEET_NAME = 'Quiz Leads';

async function writeToGoogleSheets(data) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Get the last row number to determine the new index
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:A`,
    });
    
    const rowIndex = (response.data.values?.length || 0) + 1;

    // Prepare the row data
    const rowData = [rowIndex, data.name, data.school];

    // Append the data
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:C`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [rowData],
      },
    });

    return true;
  } catch (error) {
    console.error('Error writing to Google Sheets:', error);
    return false;
  }
}

async function createQuizLeadNMT(data) {
  const { school, name, parentName, parentPhone, ...utmFields } = data;

  // Write to Google Sheets first
  await writeToGoogleSheets({ name, school });

  const postRequest = [
    {
      name: `Lead ${name}`,
      status_id: 59164875,
      pipeline_id: 6453287,
      custom_fields_values: [
        {
          field_id: 1827493,
          field_name: "Школа",
          values: [
            {
              value: school || "",
            },
          ],
        },
        ...Object.entries(utmFields).map(([key, value]) => ({
          field_id: getFieldIdByKey(key),
          values: [{ value: value || "" }],
        })),
      ],
      _embedded: {
        tags: [
          { name: "Лід з сайту" },
          { name: "квіз лід НМТ" },
          { name: utmFields.utm_source },
          { name: utmFields.utm_campaign },
          { name: utmFields.utm_term },
          { name: utmFields.utm_content },
          { name: utmFields.fbclid },
          { name: utmFields.gclid },
          { name: utmFields.gclientid },
          { name: utmFields.utm_medium },
          { name: utmFields.utm_referrer },
          { name: utmFields.referrer },
        ],
        contacts: [
          {
            name: parentName,
            custom_fields_values: [
              {
                field_id: 556510,
                field_name: "Phone",
                values: [
                  {
                    value: parentPhone,
                    enum_code: "WORK",
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  ];

  try {
    const currentToken = await getToken();
    axios.defaults.headers.common.Authorization = `Bearer ${currentToken[0].access_token}`;

    const crmLead = await axios.post("/api/v4/leads/complex", postRequest);
    return crmLead.data[0];
  } catch (error) {
    console.error("Error creating lead:", error);
    throw error;
  }
}

// Helper function to map UTM/referrer keys to field IDs
function getFieldIdByKey(key) {
  const fieldMap = {
    utm_source: 556524,
    utm_medium: 556520,
    utm_campaign: 556522,
    utm_term: 556526,
    utm_content: 556518,
    utm_referrer: 556528,
    referrer: 556530,
    gclientid: 556532,
    gclid: 556534,
    fbclid: 556536,
  };
  return fieldMap[key] || null;
}

module.exports = {
  createQuizLeadNMT,
};
