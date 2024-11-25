const axios = require("axios");
require("dotenv").config();
const { getToken } = require("../../services/tokensServices");

axios.defaults.baseURL = process.env.BASE_URL;

const getResponsibleUser = async (req, _, next) => {
  const crmObject = req.body.leads.update[0];

  try {
    const currentToken = await getToken();
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${currentToken[0].access_token}`;
    const crmResponsibleUser = await axios.get(
      `/api/v4/users/${crmObject.responsible_user_id}`
    );

    console.log(crmResponsibleUser.data.name);

    req.body.manager = crmResponsibleUser.data.name;
    console.log("manager in getter", req.body.manager);
    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = getResponsibleUser;
