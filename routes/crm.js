const express = require("express");
const { getResponsibleUserName } = require("../controllers/crm/responsibleUser");
const { apiKeyAuth } = require("../middlewares/apiKeyAuth");

const router = express.Router();

router.get("/users/:userId", apiKeyAuth, getResponsibleUserName);

module.exports = router;
