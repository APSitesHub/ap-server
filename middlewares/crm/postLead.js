const axios = require("axios");
require("dotenv").config();
const { getToken } = require("../../services/tokensServices");
const { newLead } = require("../../services/leadsServices");
const { ref } = require("joi");

axios.defaults.baseURL = process.env.BASE_URL;

const postLead = async (req, res, _) => {
  console.log('POST LEAD MIDDLEWARE');
  console.log(req)
  const postRequest = [
    {
      name: `Website Lead ${req.body.name}`,
      status_id: 59164875,
      pipeline_id: 6453287,
      custom_fields_values: [
        {
          field_id: 1829919,
          field_name: "referral_id",
          values: [
            {
              value: req.body.referral || "",
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
      // _embedded: {
      //   tags:
      //     !req.headers.origin.includes("academy.") &&
      //     (req.body.utm_content ||
      //       req.body.utm_medium ||
      //       req.body.utm_campaign ||
      //       req.body.utm_source ||
      //       req.body.utm_term ||
      //       req.body.utm_referrer ||
      //       req.body.referrer ||
      //       req.body.gclientid ||
      //       req.body.gclid ||
      //       req.body.fbclid)
      //       ? [
      //           { name: "Лід з сайту" },
      //           { name: req.body.tag },
      //           { name: req.body.utm_source },
      //           { name: req.body.utm_campaign },
      //           { name: req.body.utm_term },
      //           { name: req.body.utm_content },
      //           { name: req.body.fbclid },
      //         ]
      //       : !req.headers.origin.includes("academy.")
      //       ? [{ name: "Лід з сайту, органіка" }, { name: req.body.tag }]
      //       : req.body.tag
      //       ? [{ name: "Альтернативне джерело" }, { name: req.body.tag }]
      //       : req.body.utm_content ||
      //         req.body.utm_medium ||
      //         req.body.utm_campaign ||
      //         req.body.utm_source ||
      //         req.body.utm_term ||
      //         req.body.utm_referrer ||
      //         req.body.referrer ||
      //         req.body.gclientid ||
      //         req.body.gclid ||
      //         req.body.fbclid
      //       ? [
      //           { name: "Лід з сайту" },
      //           { name: req.body.utm_source },
      //           { name: req.body.utm_campaign },
      //           { name: req.body.utm_term },
      //           { name: req.body.utm_content },
      //           { name: req.body.fbclid },
      //         ]
      //       : [{ name: "Лід з сайту, органіка" }],
      //   contacts: [
      //     {
      //       name: req.body.name,
      //       custom_fields_values: [
      //         {
      //           field_id: 556510,
      //           field_name: "Work phone",
      //           values: [
      //             {
      //               value: req.body.phone,
      //               enum_code: "WORK",
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   ],
      // },
    },
  ];

  const lead = {
    name: req.body.name,
    phone: req.body.phone,
    tag: req.body.tag,
    utm_content: req.body.utm_content,
    utm_medium: req.body.utm_medium,
    utm_campaign: req.body.utm_campaign,
    utm_source: req.body.utm_source,
    utm_term: req.body.utm_term,
    utm_referrer: req.body.utm_referrer,
    referrer: req.body.referrer,
    gclientid: req.body.gclientid,
    gclid: req.body.gclid,
    fbclid: req.body.fbclid,
    referral: req.body.referral || "",
  };

  try {
    const currentToken = await getToken();

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${currentToken[0].access_token}`;

    const crmLead = await axios.post("api/v4/leads/complex", postRequest);
    const crmLeadId = crmLead.data[0].id;
    return res.status(201).json(await newLead({ ...lead, crmId: crmLeadId }));
  } catch (error) {
    console.log(JSON.stringify(error.response.data));
    return res.status(400).json({ message: "Lead was not created" });
  }
};

module.exports = postLead;
