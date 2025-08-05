const axios = require("axios");
require("dotenv").config();
const { getToken } = require("../tokensServices");

axios.defaults.baseURL = process.env.BASE_URL;

/**
 * Creates an exam lead in CRM with the specified pipeline
 * @param {Object} data - Lead data including exam details
 * @returns {Object} Created lead data
 */
async function createExamLead(data) {
  const { name, email, phone, preferredCommunicator, exam, ...utmFields } = data;

  const postRequest = [
    {
      name: `Exam Lead ${name}`,
      status_id: 90052528,
      pipeline_id: 11711816, 
      custom_fields_values: [
        {
          field_id: 1824489,
          field_name: "Email",
          values: [
            {
              value: email || "",
            },
          ],
        },
        {
          field_id: 1829187,
          field_name: "Exam Name",
          values: [
            {
              value: exam?.name || "",
            },
          ],
        },
        {
          field_id: 1829189,
          field_name: "Exam Price",
          values: [
            {
              value: exam?.price || "",
            },
          ],
        },
        {
          field_id: 1829191,
          field_name: "Preferred Communicator",
          values: [
            {
              value: preferredCommunicator || "",
            },
          ],
        },
        // UTM fields
        {
          field_id: 556518,
          field_name: "utm_content",
          values: [
            {
              value: utmFields.utm_content || "",
            },
          ],
        },
        {
          field_id: 556520,
          field_name: "utm_medium",
          values: [
            {
              value: utmFields.utm_medium || "",
            },
          ],
        },
        {
          field_id: 556522,
          field_name: "utm_campaign",
          values: [
            {
              value: utmFields.utm_campaign || "",
            },
          ],
        },
        {
          field_id: 556524,
          field_name: "utm_source",
          values: [
            {
              value: utmFields.utm_source || "",
            },
          ],
        },
        {
          field_id: 556526,
          field_name: "utm_term",
          values: [
            {
              value: utmFields.utm_term || "",
            },
          ],
        },
        {
          field_id: 556528,
          field_name: "utm_referrer",
          values: [
            {
              value: utmFields.utm_referrer || "",
            },
          ],
        },
        {
          field_id: 556530,
          field_name: "referrer",
          values: [
            {
              value: utmFields.referrer || "",
            },
          ],
        },
        {
          field_id: 556532,
          field_name: "gclientid",
          values: [
            {
              value: utmFields.gclientid || "",
            },
          ],
        },
        {
          field_id: 556534,
          field_name: "gclid",
          values: [
            {
              value: utmFields.gclid || "",
            },
          ],
        },
        {
          field_id: 556536,
          field_name: "fbclid",
          values: [
            {
              value: utmFields.fbclid || "",
            },
          ],
        },
      ],
      _embedded: {
        tags: [
          { name: "Exam Lead" },
          { name: exam?.name || "Unknown Exam" },
          { name: preferredCommunicator || "No Preference" },
          { name: utmFields.utm_source },
          { name: utmFields.utm_campaign },
          { name: utmFields.utm_term },
          { name: utmFields.utm_content },
          { name: utmFields.fbclid },
          { name: utmFields.gclid },
          { name: utmFields.gclientid },
        ].filter(tag => tag.name && tag.name.trim() !== ""), // Filter out empty tags
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
                field_id: 556512,
                field_name: "Email",
                values: [
                  {
                    value: email || "",
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

    console.log("Sending request to CRM:", JSON.stringify(postRequest, null, 2));
    
    const crmLead = await axios.post("/api/v4/leads/complex", postRequest);
    return crmLead.data[0];
  } catch (error) {
    console.error("Error creating exam lead:", error);
    
    // Log detailed validation errors if available
    if (error.response && error.response.data && error.response.data['validation-errors']) {
      console.error("CRM Validation errors:", JSON.stringify(error.response.data['validation-errors'], null, 2));
    }
    
    throw error;
  }
}

module.exports = { createExamLead };
