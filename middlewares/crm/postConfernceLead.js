const axios = require("axios");
require("dotenv").config();
const { getToken } = require("../../services/tokensServices");
const { google } = require("googleapis");

axios.defaults.baseURL = process.env.BASE_URL;

const postConferenceLead = async (req, res, _) => {
  const postRequest = [
    {
      name: `Website Lead ${req.body.name}`,
      status_id: 76882104,
      pipeline_id: 7001587,
      custom_fields_values: [
        {
          field_id: 1824489,
          field_name: "Email",
          values: [
            {
              value: req.body.email || "",
            },
          ],
        },
        {
          field_id: 1807468,
          field_name: "Телефон",
          values: [
            {
              value: req.body.phone || "",
            },
          ],
        },
        {
          field_id: 1824389,
          field_name: "Звідки про нас дізнались",
          values: [
            {
              value: req.body.source || "",
            },
          ],
        },
        {
          field_id: 1824387,
          field_name: "Роль на конференції",
          values: [
            {
              value: req.body.role || "",
            },
          ],
        },
        {
          field_id: 558988,
          field_name: "Місто",
          values: [
            {
              value: req.body.city || "",
            },
          ],
        },
        {
          field_id: 557652,
          field_name: "Скільки років?",
          values: [
            {
              value: req.body.age || "",
            },
          ],
        },
        {
          field_id: 556518,
          field_name: "utm_content",
          values: [
            {
              value: req.body.utm_content || "",
            },
          ],
        },
        {
          field_id: 556520,
          field_name: "utm_medium",
          values: [
            {
              value: req.body.utm_medium || "",
            },
          ],
        },
        {
          field_id: 556522,
          field_name: "utm_campaign",
          values: [
            {
              value: req.body.utm_campaign || "",
            },
          ],
        },
        {
          field_id: 556524,
          field_name: "utm_source",
          values: [
            {
              value: req.body.utm_source || "",
            },
          ],
        },
        {
          field_id: 556526,
          field_name: "utm_term",
          values: [
            {
              value: req.body.utm_term || "",
            },
          ],
        },
        {
          field_id: 556528,
          field_name: "utm_referrer",
          values: [
            {
              value: req.body.utm_referrer || "",
            },
          ],
        },
        {
          field_id: 556530,
          field_name: "referrer",
          values: [
            {
              value: req.body.referrer || "",
            },
          ],
        },
        {
          field_id: 556532,
          field_name: "gclientid",
          values: [
            {
              value: req.body.gclientid || "",
            },
          ],
        },
        {
          field_id: 556534,
          field_name: "gclid",
          values: [
            {
              value: req.body.gclid || "",
            },
          ],
        },
        {
          field_id: 556536,
          field_name: "fbclid",
          values: [
            {
              value: req.body.fbclid || "",
            },
          ],
        },
        {
          field_id: 1822925,
          field_name: "Час дзвінка",
          values: [
            {
              value: req.body.time || "",
            },
          ],
        },
      ],
      _embedded: {
        tags:
          !req.headers.origin.includes("academy.") &&
          (req.body.utm_content ||
            req.body.utm_medium ||
            req.body.utm_campaign ||
            req.body.utm_source ||
            req.body.utm_term ||
            req.body.utm_referrer ||
            req.body.referrer ||
            req.body.gclientid ||
            req.body.gclid ||
            req.body.fbclid)
            ? [
                { name: "Лід з сайту" },
                { name: req.body.tag },
                { name: req.body.utm_source },
                { name: req.body.utm_campaign },
                { name: req.body.utm_term },
                { name: req.body.utm_content },
                { name: req.body.fbclid },
              ]
            : !req.headers.origin.includes("academy.")
              ? [{ name: "Лід з сайту, органіка" }, { name: req.body.tag }]
              : req.body.tag
                ? [{ name: "Альтернативне джерело" }, { name: req.body.tag }]
                : req.body.utm_content ||
                    req.body.utm_medium ||
                    req.body.utm_campaign ||
                    req.body.utm_source ||
                    req.body.utm_term ||
                    req.body.utm_referrer ||
                    req.body.referrer ||
                    req.body.gclientid ||
                    req.body.gclid ||
                    req.body.fbclid
                  ? [
                      { name: "Лід з сайту" },
                      { name: req.body.utm_source },
                      { name: req.body.utm_campaign },
                      { name: req.body.utm_term },
                      { name: req.body.utm_content },
                      { name: req.body.fbclid },
                    ]
                  : [{ name: "Лід з сайту, органіка" }],
      },
    },
  ];
  const currentToken = await getToken();
  axios.defaults.headers.common["Authorization"] =
    `Bearer ${currentToken[0].access_token}`;
  const crmLead = await axios.post("api/v4/leads/complex", postRequest);
  const lead = {
    id: crmLead.data[0].id,
    name: req.body.name,
    phone: req.body.phone,
    city: req.body.city,
    role: req.body.role,
    age: req.body.age,
    source: req.body.source,
    email: req.body.email,
    tags: [
      req.body.tag,
      req.body.utm_content,
      req.body.utm_medium,
      req.body.utm_campaign,
      req.body.utm_source,
      req.body.utm_term,
      req.body.utm_referrer,
      req.body.referrer,
      req.body.gclientid,
      req.body.gclid,
      req.body.fbclid,
    ],
  };
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const googleSheetId = process.env.GOOGLE_SHEET_ID;
  const googleSheetPage = "Аркуш1";
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
    const newRow = [
      [
        lead.id,
        lead.tags.join(", "),
        lead.name,
        lead.phone,
        lead.city,
        lead.age,
        lead.role,
        lead.source,
        lead.email,
      ],
    ];

    // Додаємо новий рядок у таблицю
    await sheetInstance.spreadsheets.values
      .append({
        spreadsheetId: googleSheetId,
        range: googleSheetPage,
        valueInputOption: "USER_ENTERED",
        resource: {
          values: newRow,
        },
      })
      .catch((error) => {
        console.log("Помилка додавання нового рядка у таблицю", error);
      });
    return res.status(201).json(lead);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = postConferenceLead;
