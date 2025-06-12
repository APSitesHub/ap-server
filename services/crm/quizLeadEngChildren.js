const axios = require("axios");
const { getToken } = require("../tokensServices");

async function createQuizLeadEngChildren(data) {
  const { answers, contacts, ...utmFields } = data;

  const postRequest = [
    {
      name: `TEST LEAD ${contacts.name}`,
      status_id: 59164875,
      pipeline_id: 6453287,
      custom_fields_values: [
        {
          field_id: 1827483,
          field_name: "Відповіді з квіза",
          values: [
            {
              value: JSON.stringify(answers),
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
          { name: "квіз лід англійська діти" },
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
            name: contacts.parentName,
            custom_fields_values: [
              {
                field_id: 556510,
                field_name: "Phone",
                values: [
                  {
                    value: contacts.phoneNumber,
                    enum_code: "WORK",
                  },
                ],
              },
              {
                field_id: 556512,
                field_name: "Email",
                values: [
                  {
                    value: contacts.email || "",
                    enum_code: "WORK",
                  },
                ],
              },
              {
                field_id: 1810641,
                field_name: "Work telegram",
                values: [
                  {
                    value: contacts.nickname || "",
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
  createQuizLeadEngChildren,
};
