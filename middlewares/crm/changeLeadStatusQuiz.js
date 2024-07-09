require("dotenv").config();

const changeLeadStatusQuiz = async (req, res) => {
  console.log(req.body);
  const axios = require("axios");
  require("dotenv").config();
  const { getToken } = require("../../services/tokensServices");

  const updateLeadStatusRequest = {
    id: req.body.user.crmId,
    status_id: 69361260,
  };

  try {
    const currentToken = await getToken();
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${currentToken[0].access_token}`;
    console.log('try change');
    await axios.patch(`api/v4/leads/${req.body.user.crmId}`, updateLeadStatusRequest);
    res.status(200).json(req.body);
  } catch (error) {
    console.log(error);
  }
};

module.exports = changeLeadStatusQuiz;
