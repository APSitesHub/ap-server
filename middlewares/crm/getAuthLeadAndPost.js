const axios = require("axios");
require("dotenv").config();
const { getToken } = require("../../services/tokensServices");
const { newQuizAuthLead } = require("../../services/leadsServices");

const getAuthLeadAndPost = async (req, res, _) => {
  console.log(req.body);

  const lead = {
    name: req.body.name,
    phone: req.body.phone,
    authCode: req.body.authCode,
    tag: req.body.tag,
    lang: req.body.lang,
    adult: req.body.adult,
    age: req.body.age,
    knowledge: req.body.knowledge,
    quantity: req.body.quantity,
    difficulties: req.body.difficulties,
    interests: req.body.interests,
    crmId: req.body.crmId,
    contactId: req.body.contactId,
  };

  try {
    const currentToken = await getToken();
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${currentToken[0].access_token}`;
    const crmLead = await axios.get(
      `https://apeducation.kommo.com/ajax/leads/detail/${req.body.crmId}`
    );

    const engPage = crmLead.data
      .match("https:\\/\\/button.kommo.com\\/[a-zA-Z]+\\/[a-zA-Z]+")[0]
      .replace("\\", "");
    console.log(engPage);
    return res.status(201).json(
      await newQuizAuthLead({
        ...lead,
        leadPage: engPage,
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = getAuthLeadAndPost;
