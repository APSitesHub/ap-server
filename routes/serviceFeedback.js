const express = require("express");
const getCRMLead = require("../services/crmGetLead");
const getCRMUser = require("../services/crmGetUser");
const { google } = require("googleapis");
const router = express.Router();

router.post("/", async (req, res) => {
  const { crmId, rating1, rating2, feedback } = req.body;

  try {
    const lead = await getCRMLead(crmId);
    const manager = await getCRMUser(lead.responsible_user_id);
    const date = new Date();
    const formattedDate = date.toLocaleString("uk-UA", {
      timeZone: "Europe/Kiev",
      dateStyle: "full",
      timeStyle: "medium",
    });

    const data = {
      crmId,
      leadName: lead.name,
      managerId: lead.responsible_user_id,
      managerName: manager.name,
      rating1,
      rating2,
      feedback,
      date: formattedDate,
    };

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID_FEEDBACK_SERVICE,
      range: `Feedback!A:Z`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: [Object.values(data)],
      },
    });

    res.status(200).json({});
  } catch (e) {
    console.error(e);
    res.status(500).json({});
  }
});

module.exports = router;
