const axios = require("axios");
require("dotenv").config();

const { savePrimaryToken, getToken } = require("../../services/tokensServices");

axios.defaults.baseURL = process.env.BASE_URL;

const authRequest = {
  client_id: process.env.CL_ID,
  client_secret: process.env.CL_SCR,
  grant_type: "authorization_code",
  code: process.env.AUTH_CODE,
  redirect_uri: process.env.REDIR_URI,
};

const crmAuth = async (_, res, next) => {
  try {
    const currentToken = await getToken();
    console.log(currentToken, "auth CurrentToken");
    if (!currentToken[0]) {
      const authResp = await axios.post("oauth2/access_token", authRequest);
      await savePrimaryToken(authResp.data);
      return res.status(authResp.status).json(authResp.data);
    }
    next();
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
  next();
};
module.exports = crmAuth;
