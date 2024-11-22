const express = require("express");
const updateUserWithWebhook = require("../controllers/webhook/updateUserWithWebhook");
const getPlatformNumberAndPupilId = require("../middlewares/platform/getPlatformNumberAndPupilId");
const getResponsibleUser = require("../middlewares/crm/getResponsibleUser");
const getLeadsForGoogleSheets = require("../middlewares/crm/getLeadsCRM");
const updateLeadPaidStatus = require("../middlewares/crm/updatePaidLeadStatus");

const router = express.Router();

router.post(
  "/kommo",
  getPlatformNumberAndPupilId,
  getResponsibleUser,
  updateUserWithWebhook,
);

router.post("/google_kommo", getLeadsForGoogleSheets, updateLeadPaidStatus);

module.exports = router;
