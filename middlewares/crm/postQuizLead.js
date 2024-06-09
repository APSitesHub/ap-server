const axios = require("axios");
require("dotenv").config();
const { getToken } = require("../../services/tokensServices");
const { newQuizLead } = require("../../services/leadsServices");

axios.defaults.baseURL = process.env.BASE_URL;

const postQuizLead = async (req, res, _) => {
  const postRequest = [
    {
      name: `Quiz lead ${req.body.name}`,
      // tried to set lead status, but due to automated lead categorizing it does not work properly
      // status_id: 55468371,
      pipeline_id: 6453287,
      custom_fields_values: [
        {
          field_id: 557724,
          field_name: "Примітка",
          values: [
            {
              value: `Для кого: ${req.body.adult ? "Для себе" : "Для дитини"}
Років${!req.body.adult ? " дитині" : ""}: ${req.body.age}
Мова: ${req.body.lang} 
Рівень: ${req.body.knowledge}
Бажає занять на тиждень: ${req.body.quantity}
Найскладніше дається: ${req.body.difficulties} 
Цікавиться: ${req.body.interests}`,
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
                    value: req.body.phone,
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
    return res
      .status(201)
      .json(await newQuizLead({ ...lead, crmId: crmLeadId }));
  } catch (error) {
    console.log(res.error);
    return res.status(400).json(error);
  }
};

module.exports = postQuizLead;
