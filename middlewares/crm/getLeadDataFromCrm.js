const axios = require("axios");
require("dotenv").config();
const { getToken } = require("../../services/tokensServices");

axios.defaults.baseURL = process.env.BASE_URL;

const getLeadDataFromCrm = async (req, res, next) => {
  console.log("getlead params", req.params);
  console.log("getlead body", req.body);

  try {
    const currentToken = await getToken();
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${currentToken[0].access_token}`;
    const crmLead = await axios.get(
      `/api/v4/leads/${req.params.id}?with=contacts`
    );

    console.log("getLead data", crmLead.data);
    req.body.contactId = crmLead.data._embedded.contacts[0].id;
    const crmContact = await axios.get(
      `/api/v4/contacts/${req.body.contactId}?with=contacts`
    );
    console.log("getContact data", crmLead.data);

    const adult = crmContact.data.custom_fields_values.find(
      (field) => field.field_id === 1819781
    ).values[0].value;

    console.log("adult", adult);
    req.body.adult =
      adult === "Для себе" ? true : adult === "Для дитини" ? false : true;

    const lang = crmLead.data.custom_fields_values.find(
      (field) => field.field_id === 1818295
    ).values[0].value;
    console.log("lang", lang);
    req.body.lang =
      lang === "Англійська"
        ? "en"
        : lang === "Англійська" && adult === false
        ? "enkids"
        : lang === "Німецька"
        ? "de"
        : lang === "Польська"
        ? "pl"
        : "";

    const level = crmLead.data.custom_fields_values.find(
      (field) => field.field_id === 1798420
    ).values[0].value;
    console.log("level", level);
    req.body.knowledge =
      level === "Beginner ( нульовий)"
        ? "a0"
        : level === "Elementary (початковий рівень)"
        ? "a1"
        : level === "Pre-intermediate (нижчий за середній)"
        ? "a2"
        : "";

    console.log("body after filling", req.body);

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = getLeadDataFromCrm;
