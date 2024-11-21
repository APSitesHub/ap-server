const axios = require("axios");
require("dotenv").config();
const { getToken } = require("../../services/tokensServices");

axios.defaults.baseURL = process.env.BASE_URL;

const getResponsibleUser = async (req, res, _) => {
  const databaseObject = req.body.leads.update[0];

  try {
    const currentToken = await getToken();
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${currentToken[0].access_token}`;
    const crmResponsibleUser = await axios.get(
      `/api/v4/users/${databaseObject.responsible_user_id}`
    );

    req.body.manager = crmResponsibleUser.data.name; 
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = getResponsibleUser;
