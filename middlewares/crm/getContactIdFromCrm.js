const axios = require("axios");
require("dotenv").config();
const { getToken } = require("../../services/tokensServices");

axios.defaults.baseURL = process.env.BASE_URL;

const getContactIdFromCrm = async (req, res, next) => {
  console.log("getlead params", req.params);
  console.log("getlead body", req.body);

  try {
    const currentToken = await getToken();
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${currentToken[0].access_token}`;
    const crmLead = await axios.get(
      `/api/v4/leads/${req.params.id}?with=contacts`
    );
    req.body.contactId = crmLead.data._embedded.contacts[0].id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = getContactIdFromCrm;
