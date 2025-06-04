const axios = require("axios");
const { getToken } = require("../tokensServices");


async function createBodoCardLead(data) {
  const { name, phone, certificate, ...utmFields } = data;

  const postRequest = [
    {
      name: `Lead ${name}`,
      status_id: 58542315,
      pipeline_id: 7001587,
      custom_fields_values: [
        ...Object.entries(utmFields).map(([key, value]) => ({
          field_id: getFieldIdByKey(key),
          values: [{ value: value || "" }],
        })),
      ],
      _embedded: {
        tags: [
          { name: "Лід з сайту" },
          { name: "Bodo_Card" },
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
            name: name,
            custom_fields_values: [
              {
                field_id: 556510,
                field_name: "Phone",
                values: [
                  {
                    value: phone,
                    enum_code: "WORK",
                  },
                ],
              },
               {
                field_id: 1828061,
                field_name: "Сертифікат",
                values: [
                  {
                    value: certificate || "",
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
  createBodoCardLead,
};
