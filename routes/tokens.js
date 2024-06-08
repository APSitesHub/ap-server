const express = require("express");

const crmAuth = require("../middlewares/crm/crmAuth");
const crmRefresh = require("../middlewares/crm/crmRefresh");

const router = express.Router();

router.post("/", crmRefresh, crmAuth);

module.exports = router;
