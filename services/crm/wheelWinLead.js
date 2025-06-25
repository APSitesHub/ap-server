const axios = require("axios");
const { getToken } = require("../tokensServices");

async function createWheelWinLead(data) {
  const { name, phone, email, prize, ...utmFields } = data;

  const postRequest = [
    {
      name: `Wheel Win Lead ${name}`,
      status_id: 59164875,
      pipeline_id: 6453287,
      custom_fields_values: [
        ...Object.entries(utmFields).map(([key, value]) => ({
          field_id: getFieldIdByKey(key),
          values: [{ value: value || "" }],
        })),
      ],
      _embedded: {
        tags: [
          { name: "Лід з сайту" },
          { name: "wheel win" },
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
            name,
            custom_fields_values: [
              {
                field_id: 556510,
                field_name: "Phone",
                values: [{ value: phone, enum_code: "WORK" }],
              },
              {
                field_id: 556512,
                field_name: "Email",
                values: [{ value: email || "", enum_code: "WORK" }],
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

    // Створення ліда
    const crmLead = await axios.post("/api/v4/leads/complex", postRequest);
    const leadId = crmLead.data[0].id;

    // Додаємо нотатку про виграш
    const noteRequest = [
      {
        entity_id: leadId,
        entity_type: "leads",
        note_type: "common",
        params: {
          text: `Виграш у колесі фортуни: ${prize}`,
        },
        request_id: `note_${leadId}`,
      },
    ];
    await axios.post("/api/v4/leads/notes", noteRequest);

    return crmLead.data[0];
  } catch (error) {
    console.error("Error creating wheel win lead or note:", error);
    throw error;
  }
}

// UTM mapping
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

module.exports = { createWheelWinLead };
