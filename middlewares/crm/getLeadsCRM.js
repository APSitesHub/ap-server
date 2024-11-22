const { getToken } = require("../../services/tokensServices");
const axios = require("axios");

const getLeadsForGoogleSheets = async (req, res, next) => {
  console.log("me log from google middleware", req.body.crmId);

  try {
    const SERVICE_PIPELINE_ID = 7001587;
    const STATUS_WAIT_PAYMENT_ID = 71921048;

    const currentToken = await getToken();
    const { crmId } = req.body;

    if (!crmId) {
      return res.status(400).json({ error: "crmId is required" });
    }

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${currentToken[0].access_token}`;

    const crmLead = await axios.get(
      `https://apeducation.kommo.com/api/v4/leads/${crmId}`
    );

    if (
      crmLead.data &&
      crmLead.data.pipeline_id === SERVICE_PIPELINE_ID &&
      crmLead.data.status_id === STATUS_WAIT_PAYMENT_ID
    ) {
      return next();
    }
    return res.status(422).json({
      error: `Lead with crmId ${crmId} does not have the allowed status`,
    });
  } catch (err) {
    console.error("Error fetching lead:", err); // Логування помилки для дебагу
    return res
      .status(500)
      .json({ error: `Error with updating lead status: ${err.message}` });
  }
};

module.exports = getLeadsForGoogleSheets;
