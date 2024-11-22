const { getToken } = require("../../services/tokensServices");
const axios = require("axios");

const updateLeadPaidStatus = async (req, res) => {
  console.log("me log from crm middleware", req.body.crmId);
  const STATUS_NEW_LEAD_ID = 58542315;
  const currentToken = await getToken();
  axios.defaults.headers.common["Authorization"] =
    `Bearer ${currentToken[0].access_token}`;
  try {
    await axios.patch(
      `https://apeducation.kommo.com/api/v4/leads/${req.body.crmId}`,
      {
        status_id: STATUS_NEW_LEAD_ID,
      },
    );
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
module.exports = updateLeadPaidStatus;
