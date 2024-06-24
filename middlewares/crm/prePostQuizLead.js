const axios = require("axios");
require("dotenv").config();
const { getToken } = require("../../services/tokensServices");

axios.defaults.baseURL = process.env.BASE_URL;

const prePostQuizLead = async (req, res, _) => {
  console.log("8", req.body);

  const postRequest = [
    {
      name: `Недозаповнений лід з квізу`,
      pipeline_id: 8956372,
      custom_fields_values: [
        {
          field_id: 1809275,
          field_name: "Логін до платформи",
          values: [
            {
              value: req.body.mail || "",
            },
          ],
        },
        {
          field_id: 1809273,
          field_name: "Пароль до платформи",
          values: [
            {
              value: req.body.password || "",
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
                req.body.knowledge === "a0"
                  ? "Beginner ( нульовий)"
                  : req.body.knowledge === "a1"
                  ? "Elementary (початковий рівень)"
                  : req.body.knowledge === "a2"
                  ? "Pre-intermediate (нижчий за середній)"
                  : req.body.knowledge === "b1"
                  ? "Intermediate (середній)"
                  : req.body.knowledge === "b2"
                  ? "Upper-intermediate (вище за середній)"
                  : req.body.knowledge === "c1"
                  ? "Advanced (високий)"
                  : "",
            },
          ],
        },
      ],
      _embedded: {
        tags: [{ name: "Лід з сайту" }, { name: req.body.tag }],
        contacts: [
          {
            name: req.body.name,
            custom_fields_values: [
              {
                field_id: 556510,
                field_name: "Work phone",
                values: [
                  {
                    value: req.body.phone || "",
                    enum_code: "WORK",
                  },
                ],
              },
              {
                field_id: 1819825,
                field_name: "Час в тиждень на навчання",
                values: [
                  {
                    value: req.body.quantity || "",
                  },
                ],
              },
              {
                field_id: 1819789,
                field_name: "Наскладніше у вивченні",
                values: [
                  {
                    value: req.body.difficulties || "",
                  },
                ],
              },
              {
                field_id: 1819787,
                field_name: "Цікавить найбільше",
                values: [
                  {
                    value: req.body.interests || "",
                  },
                ],
              },
              {
                field_id: 1819781,
                field_name: "Для кого навчання",
                values: [
                  {
                    value: req.body.adult ? "Для себе" : "Для дитини",
                  },
                ],
              },
              {
                field_id: 1819779,
                field_name: "Вік",
                values: [
                  {
                    value: req.body.adult ? req.body.age : "",
                  },
                ],
              },
              {
                field_id: 1819821,
                field_name: "Скільки років дитині",
                values: [
                  {
                    value: req.body.adult ? "" : req.body.age,
                  },
                ],
              },
              {
                field_id: 1819783,
                field_name: "Рівень мови",
                values: [
                  {
                    value: req.body.adult ? req.body.knowledge : "",
                  },
                ],
              },
              {
                field_id: 1819823,
                field_name: "Рівень англ дитини",
                values: [
                  {
                    value: req.body.adult ? "" : req.body.knowledge,
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  ];

  const lead = {
    name: req.body.name,
    phone: req.body.phone,
    tag: req.body.tag,
    lang: req.body.lang,
    adult: req.body.adult,
    age: req.body.age,
    knowledge: req.body.knowledge,
    quantity: req.body.quantity,
    difficulties: req.body.difficulties,
    interests: req.body.interests,
  };

  try {
    const currentToken = await getToken();
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${currentToken[0].access_token}`;
    const crmLead = await axios.post("api/v4/leads/complex", postRequest);
    console.log(crmLead.data[0]);
    const crmLeadId = crmLead.data[0].id;
    const crmContactId = crmLead.data[0].contact_id;
    // const leadInfo = await axios.get(`/api/v4/leads/${crmLeadId}`);
    const leadInfo = await axios.get(`/api/v4/leads/${crmLeadId}`);
    console.log("leadInfo.data", leadInfo.data);
    const leadPage = leadInfo.data.custom_fields_values.find(
      (field) => field.field_name === "EngPage"
    )?.values[0]?.value;
    console.log("leadPage", leadPage);

    return res.status(201).json(leadPage);
  } catch (error) {
    console.log(res.error);
    return res.status(400).json(error);
  }
};

module.exports = prePostQuizLead;
