const axios = require("axios");
require("dotenv").config();
const { getToken } = require("../../services/tokensServices");

axios.defaults.baseURL = process.env.BASE_URL;

const updateUserFromGifts = async (req, res, next) => {
  console.log(8, req.body);
  console.log(req.params);
  const updateLeadStatusRequest = {
    id: req.params.id,
    name: `${req.body.name}`,
    pipeline_id: 8956372,
    status_id: 71135480,
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
    ],
  };

  const updateContactRequest = {
    id: req.body.contactId,
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
    ],
  };

  try {
    const currentToken = await getToken();
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${currentToken[0].access_token}`;
    const lead = await axios.patch(
      `api/v4/leads/${req.params.id}`,
      updateLeadStatusRequest
    );
    const contact = await axios.patch(
      `api/v4/contacts/${req.body.contactId}`,
      updateContactRequest
    );
    req.body.crmId = req.params.id;
    req.body.manager = "-";
    req.body.course = "0";
    req.body.package = "Марафон";
    req.body.pupilId = "0000000";
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = updateUserFromGifts;
