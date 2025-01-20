const axios = require("axios");
require("dotenv").config();
const { getToken } = require("../../services/tokensServices");

axios.defaults.baseURL = process.env.BASE_URL;

const postLeadEvent = async (req, res, _) => {
  console.log("origin", req.headers.origin);

  const postRequest = [
    {
      ...(req.body.childName ? { name: `Event ${req.body.childName}` } : { name: `Event ${req.body.name}` }),
      status_id: 71881904,
      pipeline_id: 7001587,
      custom_fields_values: [
        {
          field_id: 556518,
          field_name: "utm_content",
          values: [
            {
              value: req.body.utm_content || "",
            },
          ],
        },
        {
          field_id: 556520,
          field_name: "utm_medium",
          values: [
            {
              value: req.body.utm_medium || "",
            },
          ],
        },
        {
          field_id: 556522,
          field_name: "utm_campaign",
          values: [
            {
              value: req.body.utm_campaign || "",
            },
          ],
        },
        {
          field_id: 556524,
          field_name: "utm_source",
          values: [
            {
              value: req.body.utm_source || "",
            },
          ],
        },
        {
          field_id: 556526,
          field_name: "utm_term",
          values: [
            {
              value: req.body.utm_term || "",
            },
          ],
        },
        {
          field_id: 556528,
          field_name: "utm_referrer",
          values: [
            {
              value: req.body.utm_referrer || "",
            },
          ],
        },
        {
          field_id: 556530,
          field_name: "referrer",
          values: [
            {
              value: req.body.referrer || "",
            },
          ],
        },
        {
          field_id: 556532,
          field_name: "gclientid",
          values: [
            {
              value: req.body.gclientid || "",
            },
          ],
        },
        {
          field_id: 556534,
          field_name: "gclid",
          values: [
            {
              value: req.body.gclid || "",
            },
          ],
        },
        {
          field_id: 556536,
          field_name: "fbclid",
          values: [
            {
              value: req.body.fbclid || "",
            },
          ],
        },
      ],
      _embedded: {
        tags: [
          {
            name: req.body.childName
              ? `ДІТИ ${req.body.eventType}`
              : `${req.body.eventType}`,
              
          },
          { name: req.body.tag },
                { name: req.body.utm_source },
                { name: req.body.utm_campaign },
                { name: req.body.utm_term },
                { name: req.body.utm_content },
                { name: req.body.fbclid }
        ],
        contacts: [
          {
            name: req.body.name,
            custom_fields_values: [
              {
                field_id: 556510,
                field_name: "Work phone",
                values: [
                  {
                    value: req.body.phone,
                    enum_code: "WORK",
                  },
                ],
              },
              ...(req.body.childName
                ? [
                    {
                      field_id: 1819821,
                      field_name: "Скільки років дитині",
                      values: [
                        {
                          value: req.body.age || "",
                        },
                      ],
                    },
                  ]
                : [
                    {
                      field_id: 1819779,
                      field_name: "Вік",
                      values: [
                        {
                          value: req.body.age || "",
                        },
                      ],
                    }
                  ]
                ),
            ],
          },
        ],
      },
    },
  ];
  try {
    const currentToken = await getToken();
    axios.defaults.headers.common["Authorization"] =
      `Bearer ${currentToken[0].access_token}`;
    const crmLead = await axios
      .post("api/v4/leads/complex", postRequest)
      .catch((err) =>
        console.log(err.response.data["validation-errors"][0].errors),
      );
    const crmLeadId = crmLead.data[0].id;
    console.log(crmLeadId);
    const leadPage = await axios.get(
          `https://apeducation.kommo.com/ajax/leads/detail/${crmLeadId}`
        );   
         const engPage = leadPage.data
          .match("https:\\/\\/button.kommo.com\\/[a-zA-Z]+\\/[a-zA-Z]+")[0]
          .replace("\\", "");
        console.log(engPage);
    return res.status(201).json({ crmId: crmLeadId, link: engPage });
  } catch (error) {
      console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = postLeadEvent;
