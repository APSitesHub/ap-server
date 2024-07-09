const axios = require("axios");
require("dotenv").config();
const { getToken } = require("../../services/tokensServices");

axios.defaults.baseURL = process.env.BASE_URL;

const updateContactByLeadId = async (req, res, next) => {
  console.log(8, req.body);
  console.log(req.params);
  const updateLeadStatusRequest = {
    id: req.params.id,
    status_id: 71135664,
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
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = updateContactByLeadId;
