const {
  newUser,
  findUser,
  updateUser,
} = require("../../services/usersServices");

const updateUserWithWebhook = async (req, res) => {
  if (req.body.leads.update[0].pipeline_id === "7001587") {
    console.log("Webhook received event from correct pipeline (7001587)!");
    console.log(10, req.body.leads.update[0]);
    const databaseObject = req.body.leads.update[0];
    req.body.request = {
      crmId: +databaseObject.id,
      name: databaseObject.name.replace("Осн", "").trim().trimEnd(),
      mail:
        databaseObject.custom_fields.find((field) =>
          Object.values(field).includes("Логін до платформи")
        ).values[0].value || "",
      password:
        databaseObject.custom_fields.find((field) =>
          Object.values(field).includes("Пароль до платформи")
        ).values[0].value || "",
      course:
        databaseObject.custom_fields
          .find((field) => Object.values(field).includes("Потоки Річний курс"))
          .values[0].value.slice(0, 3)
          .replace(".", "") || "",
      lang:
        databaseObject.custom_fields.find((field) =>
          Object.values(field).includes("Вид послуги")
        ).values[0].value === "Англійська"
          ? "en"
          : databaseObject.custom_fields.find((field) =>
              Object.values(field).includes("Вид послуги")
            ).values[0].value === "Англійська діти"
          ? "enkids"
          : databaseObject.custom_fields.find((field) =>
              Object.values(field).includes("Вид послуги")
            ).values[0].value === "Німецька"
          ? "de"
          : databaseObject.custom_fields.find((field) =>
              Object.values(field).includes("Вид послуги")
            ).values[0].value === "Німецька діти"
          ? "dekids"
          : databaseObject.custom_fields.find((field) =>
              Object.values(field).includes("Вид послуги")
            ).values[0].value === "Польська"
          ? "pl"
          : databaseObject.custom_fields.find((field) =>
              Object.values(field).includes("Вид послуги")
            ).values[0].value === "Польська діти"
          ? "plkids"
          : databaseObject.custom_fields.find((field) =>
              Object.values(field).includes("Вид послуги")
            ).values[0].value || "",
      age:
        databaseObject.custom_fields.find((field) =>
          Object.values(field).includes("Скільки років?")
        ).values[0].value || "",
      marathonNumber: req.body.marathonNumber || "",
      manager: +databaseObject.responsible_user_id || "",
    };

    if (+databaseObject.status_id === 58542315) {
      const userExists = await findUser({ crmId: +databaseObject.id });
      console.log(87, userExists);

      userExists
        ? res
            .status(201)
            .json(await updateUser(userExists._id, { ...req.body.request }))
        : res.status(201).json(await newUser({ ...req.body.request }));
    }
  }

  return res.status(200).json({ message: "OK" });
};

module.exports = updateUserWithWebhook;