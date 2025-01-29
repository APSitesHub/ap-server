const axios = require("axios");
require("dotenv").config();

const { getToken, refreshToken } = require("../../services/tokensServices");

axios.defaults.baseURL = process.env.BASE_URL;

const crmRefresh = async (_, res, next) => {
  try {
    const currentToken = await getToken();
    console.log(11, currentToken);

    if (currentToken[0]) {
      const refreshRequestBody = {
        client_id: process.env.CL_ID,
        client_secret: process.env.CL_SCR,
        grant_type: "refresh_token",
        refresh_token: currentToken[0].refresh_token,
        redirect_uri: process.env.REDIR_URI,
      };

      console.log(22, refreshRequestBody);

      const refreshResp = await axios.post(
        "oauth2/access_token",
        refreshRequestBody
      );

      console.log(29, refreshResp.data);

      const newToken = await refreshToken(
        currentToken[0]._id,
        refreshResp.data
      );
      // console.log(newToken);
      return res.status(200).json(newToken);
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json(error);
  }
};

module.exports = crmRefresh;
