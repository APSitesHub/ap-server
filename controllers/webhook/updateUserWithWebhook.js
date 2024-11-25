const {
  newUser,
  findUser,
  updateUser,
} = require("../../services/usersServices");

const updateUserWithWebhook = async (req, res) => {
  console.log("marathonNumber in updater", req.body.marathonNumber);
  console.log("manager in updater", req.body.manager);
  console.log("pupilId in updater", req.body.pupilId);

  try {
    if (req.body.leads.update[0].pipeline_id === "7001587") {
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
            .find((field) =>
              Object.values(field).includes("Потоки Річний курс")
            )
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
        pupilId: req.body.pupilId || "",
        manager: req.body.manager || "",
      };

      if (+databaseObject.status_id === 58542315) {
        const userExists = await findUser({ crmId: +databaseObject.id });
        console.log(65, userExists);

        return userExists
          ? res
              .status(201)
              .json(await updateUser(userExists._id, { ...req.body.request }))
          : res.status(201).json(await newUser({ ...req.body.request }));
      }
    }
    return res.status(200).json({ message: "OK" });
  } catch (err) {
    console.log("error from lead ID:", req.body.leads.update[0].id);
    console.log(err);
    return res.status(200).json({ message: "OK" });
  }
};

module.exports = updateUserWithWebhook;
