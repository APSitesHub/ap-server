const express = require("express");
const { newUser } = require("../services/usersServices");

const router = express.Router();
router.post("/kommo", async (req, res) => {
  console.log("Webhook received");
  console.log(req.body.leads.update[0].pipeline_id);

  if (req.body.leads.update[0].pipeline_id === "7001587") {
    console.log("Webhook received event from correct pipeline (7001587)!");
    console.log(req.body.leads.update[0]);
    const databaseObject = req.body.leads.update[0];
    req.body.request = {
      crmId: +databaseObject.id,
      name: databaseObject.name,
      mail: databaseObject.custom_fields.find((field) =>
        Object.values(field).includes("Логін до платформи")
      ).values[0].value,
      password: databaseObject.custom_fields.find((field) =>
        Object.values(field).includes("Пароль до платформи")
      ).values[0].value,
      course: databaseObject.custom_fields.find((field) =>
        Object.values(field).includes("Потоки Річний курс")
      ).values[0].value,
      lang: databaseObject.custom_fields.find((field) =>
        Object.values(field).includes("Мова для вивчення")
      ).values[0].value,
      age: databaseObject.custom_fields.find((field) =>
        Object.values(field).includes("Скільки років?")
      ).values[0].value,
      manager: +databaseObject.responsible_user_id,
    };

    if (+databaseObject.id === 19755581) {
      return res.status(201).json(await newUser({ ...req.body.request }));
    }
  }

  return res.status(200).json({ message: "OK" });
});
module.exports = router;
