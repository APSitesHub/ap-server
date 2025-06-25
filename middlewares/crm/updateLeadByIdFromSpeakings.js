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
                (req.body.feedback.temperament === "extro"
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
                (req.body.feedback.successRate === "good"
                  ? "Сильний"
                  : req.body.feedback.successRate === "mid"
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
                req.body.feedback.text
                  .replace(
                    /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{1FB00}-\u{1FBFF}\u{1FC00}-\u{1FCFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{FE0F}]/gu,
                    ""
                  )
                  .replace(regex, "")
                  .trim()
                  .replace(",", ":")
                  .split(" ")
                  .slice(1)
                  .join(" ") || "",
            },
          ],
        },
        {
          field_id: 1823753,
          field_name: "Граматика",
          values: [
            {
              value:
                (req.body.feedback.grammar === 3
                  ? "Дуже добре"
                  : req.body.feedback.grammar === 2
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
                (req.body.feedback.lexis === 3
                  ? "Дуже добре"
                  : req.body.feedback.lexis === 2
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
                (req.body.feedback.speaking === 3
                  ? "Дуже добре"
                  : req.body.feedback.speaking === 2
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
                (req.body.feedback.listening === 3
                  ? "Дуже добре"
                  : req.body.feedback.listening === 2
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
                (req.body.feedback.activity === 3
                  ? "Дуже добре"
                  : req.body.feedback.activity === 2
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
