const axios = require("axios");
require("dotenv").config();
const { getToken } = require("../../services/tokensServices");

axios.defaults.baseURL = process.env.BASE_URL;

const postLeadCertificate = async (req, res, _) => {
  console.log("origin", req.headers.origin);

  const postRequest = [
    {
      name: `CER Lead ${req.body.name}`,
      status_id: 77817896,
      pipeline_id: 9271664,
      custom_fields_values: [
        {
          field_id: 1824627,
          field_name: "Робота",
          values: [
            {
              value: req.body.work || "",
            },
          ],
        },
      ],
      _embedded: {
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
              {
                field_id: 556512,
                field_name: "Email",
                values: [
                  {
                    value: req.body.email,
                    enum_code: "WORK",
                  },
                ],
              },
              {
                field_id: 556508,
                field_name: "Position",
                values: [
                  {
                    value: "123123",
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
    axios.defaults.headers.common["Authorization"] =
      `Bearer ${currentToken[0].access_token}`;
    const crmLead = await axios
      .post("api/v4/leads/complex", postRequest)
      .catch((err) =>
        console.log(err.response.data["validation-errors"][0].errors),
      );
    const crmLeadId = crmLead.data[0].id;
    return res.status(201).json({ crmId: crmLeadId });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = postLeadCertificate;
