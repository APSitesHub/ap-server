const axios = require("axios");
require("dotenv").config();
const { getToken } = require("../../services/tokensServices");

const getLead = async (req, res, _) => {
  console.log(6, req.body);

  try {
    const currentToken = await getToken();
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${currentToken[0].access_token}`;
    const crmLead = await axios.get(
      `https://apeducation.kommo.com/ajax/leads/detail/${req.body.crmId}`
    );
    const engPage = crmLead.data
      .match("https:\\/\\/button.kommo.com\\/[a-zA-Z]+\\/[a-zA-Z]+")[0]
      .replace("\\", "");
    console.log(engPage);
    return res
      .status(200)
      .json({
        crmId: req.body.crmId,
        contactId: req.body.contactId,
        engPage: engPage,
      });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = getLead;
