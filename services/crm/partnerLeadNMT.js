const axios = require("axios");
const { getToken } = require("../tokensServices");

async function createPartnerLeadNMT(data) {
  const { childName, subjects, grade, school, parentName, parentPhone, comment, utmTags } = data;

  const postRequest = [
    {
      name: `Lead for ${childName}`,
      status_id: 59164875,
      pipeline_id: 6453287,
      custom_fields_values: [
        {
          field_id: 1827497, // Field for storing subjects
          field_name: "Предмети",
          values: [
            {
              value: subjects.join(", "),
            },
          ],
        },
        {
          field_id: 1827495, // Field for storing grade
          field_name: "Клас",
          values: [
            {
              value: grade,
            },
          ],
        },
        {
          field_id: 1827493, // Field for storing school
          field_name: "Школа",
          values: [
            {
              value: school,
            },
          ],
        },
        {
          field_id: 557724, // Field for storing parent comment
          field_name: "Примітка",
          values: [
            {
              value: comment || "",
            },
          ],
        },
        ...Object.entries(utmTags).map(([key, value]) => ({
          field_id: getFieldIdByKey(key), // Map UTM/referrer fields to their IDs
          values: [{ value: value || "" }],
        })),
      ],
      _embedded: {
        tags: [
          { name: "Лід з сайту" },
          { name: "освітній лід" },
          { name: utmTags.utm_source },
          { name: utmTags.utm_campaign },
          { name: utmTags.utm_term },
          { name: utmTags.utm_content },
          { name: utmTags.fbclid },
          { name: utmTags.gclid },
          { name: utmTags.gclientid },
          { name: utmTags.utm_medium },
          { name: utmTags.utm_referrer },
          { name: utmTags.referrer },
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

    // Create the lead
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
  createPartnerLeadNMT,
};
