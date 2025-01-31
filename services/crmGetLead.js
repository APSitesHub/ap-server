const axios = require("axios");
require("dotenv").config();
const { getToken } = require("./tokensServices");


async function getCRMLead (id)  {  
    try {
      const currentToken = await getToken();
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${currentToken[0].access_token}`;
      const crmLead = await axios.get(
        `https://apeducation.kommo.com/api/v4/leads/${id}`
      );
      return crmLead.data
    } catch (error) {
      console.log(error);
      return null;
    }
  };


  module.exports = getCRMLead;