const axios = require("axios");
require("dotenv").config();
const { getToken } = require("../../services/tokensServices");

axios.defaults.baseURL = process.env.BASE_URL;

const regex = /\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}:\d{2}:/g;

const updateLeadByIdFromSpeakings = async (req, res, next) => {
  if (req.body.crmId) {
    const updateRequest = {
      custom_fields_values: [
        {
          field_id: 1821875,
          field_name: "Темперамент",
          values: [
            {
              value:
                (req.body.temperament === "extro"
                  ? "Екстраверт"
                  : "Інтроверт ") || "",
            },
          ],
        },
        {
          field_id: 1821877,
          field_name: "Сила",
          values: [
            {
              value:
                (req.body.successRate === "good"
                  ? "Сильний"
                  : req.body.successRate === "mid"
                  ? "Середній"
                  : "Слабкий") || "",
            },
          ],
        },
        {
          field_id: 1821879,
          field_name: "Фідбек",
          values: [
            {
              value:
                req.body.feedback.replace(regex, "").trim().replace(",", ":") ||
                "",
            },
          ],
        },
        {
          field_id: 1823753,
          field_name: "Граматика",
          values: [
            {
              value:
                (req.body.grammar === "3"
                  ? "Дуже добре"
                  : req.body.grammar === "2"
                  ? "Добре"
                  : "Потребує покращення") || "",
            },
          ],
        },
        {
          field_id: 1823755,
          field_name: "Лексика",
          values: [
            {
              value:
                (req.body.lexis === "3"
                  ? "Дуже добре"
                  : req.body.lexis === "2"
                  ? "Добре"
                  : "Потребує покращення") || "",
            },
          ],
        },
        {
          field_id: 1823757,
          field_name: "Говоріння/вимова",
          values: [
            {
              value:
                (req.body.speaking === "3"
                  ? "Дуже добре"
                  : req.body.speaking === "2"
                  ? "Добре"
                  : "Потребує покращення") || "",
            },
          ],
        },
        {
          field_id: 1823759,
          field_name: "Слухання",
          values: [
            {
              value:
                (req.body.listening === "3"
                  ? "Дуже добре"
                  : req.body.listening === "2"
                  ? "Добре"
                  : "Потребує покращення") || "",
            },
          ],
        },
        {
          field_id: 1823761,
          field_name: "Активність на уроці",
          values: [
            {
              value:
                (req.body.activity === "3"
                  ? "Дуже добре"
                  : req.body.activity === "2"
                  ? "Добре"
                  : "Потребує покращення") || "",
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
      console.log(crm.data);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }
  next();
};

module.exports = updateLeadByIdFromSpeakings;
