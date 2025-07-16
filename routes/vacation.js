const express = require("express");
const createTasksForAllServiceUsers = require("../utils/crm/createTasksForAllServiceUsers");

const router = express.Router();
router.post("/new", (req, res) => {
  const teacherName = req.body.data[0];
  const dateFrom = new Date(req.body.data[4]).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Europe/Kyiv",
  });
  const dateTo = new Date(req.body.data[5]).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Europe/Kyiv",
  });
  const taskText = `Викладач ${teacherName} буде відсутній в період: ${dateFrom}-${dateTo}`;

  createTasksForAllServiceUsers(taskText);
});

module.exports = router;
