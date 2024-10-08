const axios = require("axios");
require("dotenv").config();
const { getToken } = require("../../services/tokensServices");

axios.defaults.baseURL = process.env.BASE_URL;

const updateLeadById = async (req, res, next) => {
  if (
    req.body.user.crmId &&
    req.body.user.contactId &&
    req.body.crmId === req.body.user.crmId &&
    req.body.contactId === req.body.user.contactId
  ) {
    const updateRequest = {
      name: req.body.name,
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
                req.body.lang === "en" || req.body.lang === "enkids"
                  ? "Англійська"
                  : req.body.lang === "de" || req.body.lang === "dekids"
                  ? "Німецька"
                  : req.body.lang === "pl" || req.body.lang === "plkids"
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
                  : req.body.knowledge === "b1beginner"
                  ? "Intermediate (середній)"
                  : req.body.knowledge === "b2"
                  ? "Upper-intermediate (вище за середній)"
                   : req.body.knowledge === "b2beginner"
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
      // console.log(crm.data);
      // console.log(contact.data);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }
  next();
};

module.exports = updateLeadById;
