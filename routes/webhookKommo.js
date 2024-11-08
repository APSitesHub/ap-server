const express = require("express");

const router = express.Router();
router.post("/kommo", (req, res) => {
  console.log("Webhook received");
  console.log(req.body.leads.update[0].pipeline_id);

  if (req.body.leads.update[0].pipeline_id === "7001587") {
    console.log("Webhook received event from correct pipeline (7001587)!");
    console.log(req.body.leads.update[0]);
    const databaseObject = req.body.leads.update[0];
    console.log({
      crmId: databaseObject.id,
      name: databaseObject.name,
      mail: databaseObject.custom_fields.find((field) => Object.keys(field).includes('Логін до платформи')).values[0].value,
      password: databaseObject.custom_fields.find((field) => Object.keys(field).includes('Пароль до платформи')).values[0].value,
      course: databaseObject.custom_fields.find((field) => Object.keys(field).includes('Потоки Річний курс')).values[0].value,
      lang: databaseObject.custom_fields.find((field) => Object.keys(field).includes('Мова для вивчення')).values[0].value,
      age: databaseObject.custom_fields.find((field) => Object.keys(field).includes('Скільки років?')).values[0].value,
    });
  }

  return res.status(200).json({ message: "OK" });
});
module.exports = router;
