const express = require("express");
const { newUser, findUser, updateUser } = require("../services/usersServices");
const { google } = require("googleapis");
const { getToken } = require("../services/tokensServices");
const axios = require("axios");

const router = express.Router();
router.post("/kommo", async (req, res) => {
  if (req.body.leads.update[0].pipeline_id === "7001587") {
    console.log("Webhook received event from correct pipeline (7001587)!");
    console.log(req.body.leads.update[0]);
    const databaseObject = req.body.leads.update[0];
    req.body.request = {
      crmId: +databaseObject.id,
      name: databaseObject.name,
      mail: databaseObject.custom_fields.find((field) =>
        Object.values(field).includes("Логін до платформи"),
      ).values[0].value,
      password: databaseObject.custom_fields.find((field) =>
        Object.values(field).includes("Пароль до платформи"),
      ).values[0].value,
      course: databaseObject.custom_fields
        .find((field) => Object.values(field).includes("Потоки Річний курс"))
        .values[0].value.slice(0, 3)
        .replace(".", ""),
      lang:
        databaseObject.custom_fields.find((field) =>
          Object.values(field).includes("Мова для вивчення"),
        ).values[0].value === "Англійська" &&
        databaseObject.custom_fields
          .find((field) => Object.values(field).includes("Потоки Річний курс"))
          .values[0].value.includes("Дорослі")
          ? "en"
          : databaseObject.custom_fields.find((field) =>
                Object.values(field).includes("Мова для вивчення"),
              ).values[0].value === "Німецька" &&
              databaseObject.custom_fields
                .find((field) =>
                  Object.values(field).includes("Потоки Річний курс"),
                )
                .values[0].value.includes("Дорослі")
            ? "de"
            : databaseObject.custom_fields.find((field) =>
                  Object.values(field).includes("Мова для вивчення"),
                ).values[0].value === "Польська" &&
                databaseObject.custom_fields
                  .find((field) =>
                    Object.values(field).includes("Потоки Річний курс"),
                  )
                  .values[0].value.includes("Дорослі")
              ? "pl"
              : databaseObject.custom_fields.find((field) =>
                    Object.values(field).includes("Мова для вивчення"),
                  ).values[0].value === "Англійська" &&
                  databaseObject.custom_fields
                    .find((field) =>
                      Object.values(field).includes("Потоки Річний курс"),
                    )
                    .values[0].value.includes("Діти")
                ? "enkids"
                : databaseObject.custom_fields.find((field) =>
                      Object.values(field).includes("Мова для вивчення"),
                    ).values[0].value === "Німецька" &&
                    databaseObject.custom_fields
                      .find((field) =>
                        Object.values(field).includes("Потоки Річний курс"),
                      )
                      .values[0].value.includes("Діти")
                  ? "dekids"
                  : databaseObject.custom_fields.find((field) =>
                        Object.values(field).includes("Мова для вивчення"),
                      ).values[0].value === "Польська" &&
                      databaseObject.custom_fields
                        .find((field) =>
                          Object.values(field).includes("Потоки Річний курс"),
                        )
                        .values[0].value.includes("Діти")
                    ? "plkids"
                    : "",
      age: databaseObject.custom_fields.find((field) =>
        Object.values(field).includes("Скільки років?"),
      ).values[0].value,
      manager: +databaseObject.responsible_user_id,
    };

    if (+databaseObject.id === 19755581) {
      const userExists = await findUser({ crmId: +databaseObject.id });
      console.log(userExists);

      userExists
        ? res
            .status(201)
            .json(await updateUser(userExists._id, { ...req.body.request }))
        : res.status(201).json(await newUser({ ...req.body.request }));
    }
  }

  return res.status(200).json({ message: "OK" });
});

router.post("/google-sheets", async (req, res) => {
  console.log(req.body.leads.status);
  const user = await getUserFromCRM(req.body.leads.status[0].id);
  console.log("-----------------------------------");
  console.log(user);
  console.log("-----------------------------------");
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const googleSheetId = process.env.GOOGLE_SHEET_ID;
  const googleSheetPage = "Аркуш3";

  // authenticate the service account
  const googleAuth = new google.auth.JWT(
    clientEmail,
    null,
    privateKey.replace(/\\n/g, "\n"),
    "https://www.googleapis.com/auth/spreadsheets",
  );
  try {
    // google sheet instance
    const sheetInstance = await google.sheets({
      version: "v4",
      auth: googleAuth,
    });
    // read data in the range in a sheet
    const newRow = [[user.id, user.name, user.price, user.tags, user.custom]];

    // Додаємо новий рядок у таблицю
    await sheetInstance.spreadsheets.values.append({
      spreadsheetId: googleSheetId,
      range: googleSheetPage,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: newRow,
      },
    });

    console.log("Новий рядок успішно додано");
  } catch (err) {
    console.log("readSheet func() error", err);
  }
  return res.status(200).json({ message: "OK" });
});

async function getUserFromCRM(userID) {
  const currentToken = await getToken();
  console.log("userId", userID);

  axios.defaults.headers.common["Authorization"] =
    `Bearer ${currentToken[0].access_token}`;
  const crmLead = await axios.get(`/api/v4/leads/${userID}?with=contacts`);

  console.log("getLead data", crmLead.data);
  const contactId = crmLead.data._embedded.contacts[0]?.id;
  const crmContact =
    contactId &&
    (await axios.get(`/api/v4/contacts/${contactId}?with=contacts`));
  console.log("getContact data", crmLead.data);
  let tags = "";
  crmLead.data._embedded.tags.forEach((tag, index) => {
    console.log(index, tag);
    tags = tags + tag.name + ", ";
  });
  console.log("custom field", crmLead.data.custom_fields_values);
  const fieldData = crmLead.data.custom_fields_values.find((field) => {
    return field.field_id === 557260;
  });
  return {
    id: crmLead.data.id,
    name: crmContact.data.name,
    price: crmLead.data.price,
    tags: tags,
    custom: fieldData.values[0].value,
  };
}

module.exports = router;
