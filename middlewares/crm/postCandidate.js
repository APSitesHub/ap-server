const axios = require("axios");
require("dotenv").config();
const { getToken } = require("../../services/tokensServices");
const { newCandidate } = require("../../services/universityLeadsServices");

axios.defaults.baseURL = process.env.BASE_URL;

const postCandidate = async (req, res, _) => {
  const postRequest = [
    {
      name: `Універи: ${req.body.name}`,
      pipeline_id: 7009587,
      custom_fields_values: [
        {
          field_id: 1807468,
          field_name: "Телефон",
          values: [
            {
              value: req.body.phone,
            },
          ],
        },
        {
          field_id: 1818295,
          field_name: "Мова для вивчення",
          values: [
            {
              value:
                req.body.lang === "en"
                  ? "Англійська"
                  : req.body.lang === "de"
                  ? "Німецька"
                  : req.body.lang === "pl"
                  ? "Польська"
                  : "",
            },
          ],
        },
        {
          field_id: 1798420,
          field_name: "Ваш рівень іноземної мови",
          values: [
            {
              value:
                req.body.level === "a1"
                  ? "Elementary (початковий рівень)"
                  : req.body.level === "a2"
                  ? "Pre-intermediate (нижчий за середній)"
                  : req.body.level === "b1"
                  ? "Intermediate (середній)"
                  : req.body.level === "b2"
                  ? "Upper-intermediate (вище за середній)"
                  : req.body.level === "c1"
                  ? "Advanced (високий)"
                  : req.body.level === "c2"
                  ? "Proficiency (найвищий)"
                  : "",
            },
          ],
        },
      ],
      _embedded: {
        tags: [{ name: req.body.tag }],
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
                field_id: 1810641,
                field_name: "Work telegram",
                values: [
                  {
                    value: req.body.tgusername,
                  },
                ],
              },
              {
                field_id: 1823575,
                field_name: "Курс, на якому навчається",
                values: [
                  {
                    value: req.body.course,
                  },
                ],
              },
              {
                field_id: 1823577,
                field_name: "Спеціальність, на якій навчається",
                values: [
                  {
                    value: req.body.specialty,
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
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${currentToken[0].access_token}`;
    const crmLead = await axios.post("api/v4/leads/complex", postRequest);
    const crmLeadId = crmLead.data[0].id;
    return res
      .status(201)
      .json(await newCandidate({ ...req.body, crmId: crmLeadId }));
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = postCandidate;
