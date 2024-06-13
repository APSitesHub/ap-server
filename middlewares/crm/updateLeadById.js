const axios = require("axios");
require("dotenv").config();
const { getToken } = require("../../services/tokensServices");

axios.defaults.baseURL = process.env.BASE_URL;

const updateLeadById = async (req, res, next) => {
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

  try {
    const currentToken = await getToken();
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${currentToken[0].access_token}`;
    await axios.patch(`api/v4/leads/${req.body.crmId}`, updateRequest);
  } catch (error) {
    return res.status(400).json(error);
  } finally {
    next();
  }
};

module.exports = updateLeadById;
