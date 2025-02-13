const express = require("express");
const updateUserWithWebhook = require("../controllers/webhook/updateUserWithWebhook");
const getPlatformNumberAndPupilId = require("../middlewares/platform/getPlatformNumberAndPupilId");
const getResponsibleUser = require("../middlewares/crm/getResponsibleUser");
const getLeadsForGoogleSheets = require("../middlewares/crm/getLeadsCRM");
const updateLeadPaidStatus = require("../middlewares/crm/updatePaidLeadStatus");
const { salesAnalyticsController } = require("../controllers/webhook/salesAnalyticsController");
const router = express.Router();

router.post(
  "/kommo",
  getPlatformNumberAndPupilId,
  getResponsibleUser,
  updateUserWithWebhook,
);

router.post("/google_kommo", getLeadsForGoogleSheets, updateLeadPaidStatus);

router.post("/sales-analytics", salesAnalyticsController);
module.exports = router;
