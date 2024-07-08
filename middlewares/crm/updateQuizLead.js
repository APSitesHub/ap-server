const axios = require("axios");
require("dotenv").config();
const { getToken } = require("../../services/tokensServices");

axios.defaults.baseURL = process.env.BASE_URL;

const updateQuizLead = async (req, res, next) => {
  const updateRequest = {
    name: req.body.name,
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
        field_id: 1820499,
        field_name: "authCode",
        values: [
          {
            value: req.body.authCode || "",
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
  };

  const updateContactRequest = {
    id: req.body.contactId,
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
      {
        field_id: 1820545,
        field_name: "authCode",
        values: [
          {
            value: req.body.authCode || "",
          },
        ],
      },
    ],
  };

  try {
    const currentToken = await getToken();
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${currentToken[0].access_token}`;
    const crm = await axios.patch(
      `api/v4/leads/${req.body.crmId}`,
      updateRequest
    );
    const contact = await axios.patch(
      `api/v4/contacts/${req.body.contactId}`,
      updateContactRequest
    );
    console.log(crm.data);
    console.log(contact.data);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
  next();
};
module.exports = updateQuizLead;
