const axios = require('axios');
const { getToken } = require("../../services/tokensServices");

const getLeadWithEngPage = async (crmId) => {
  try {
    const currentToken = await getToken();
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${currentToken[0].access_token}`;
    const crmLead = await axios.get(
      `https://apeducation.kommo.com/ajax/leads/detail/${crmId}`
    );
    const engPage = crmLead.data
      .match("https:\\/\\/button.kommo.com\\/[a-zA-Z]+\\/[a-zA-Z]+")[0]
      .replace("\\", "");
    console.log(engPage);
    return{
        crmId: crmId,
        engPage: engPage,
      };
  } catch (error) {
    console.log(error);
    return {
      crmId: crmId,
      engPage: null,
    };
  }
};

module.exports = getLeadWithEngPage;
