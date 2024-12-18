const {
  allUsers,
  allUsersPlatformENG,
  allUsersPlatformPL,
  allUsersPlatformDE,
  allUsersPlatform,
  allUsersPlatformDEKIDS,
  allUsersPlatformENGKIDS,
  allUsersPlatformPLKIDS,
  allC1Users,
} = require("../../services/usersServices");

const getAllUsers = async (_, res) => {
  return res.json(await allUsers());
};

const getC1SpeakingUsers = async (_, res) => {
  return res.json(await allC1Users());
};

const getAllUsersPlatformData = async (req, res) => {
  const { lang } = req.query;
  switch (lang) {
    case "en": {
      return res.json(await allUsersPlatformENG());
    }
    case "pl": {
      return res.json(await allUsersPlatformPL());
    }
    case "de": {
      return res.json(await allUsersPlatformDE());
    }
    case "enkids": {
      return res.json(await allUsersPlatformENGKIDS());
    }
    case "plkids": {
      return res.json(await allUsersPlatformPLKIDS());
    }
    case "dekids": {
      return res.json(await allUsersPlatformDEKIDS());
    }
    default: {
      return res.json(await allUsersPlatform());
    }
  }
};
module.exports = {
  getAllUsersPlatformData,
  getAllUsers,
  getC1SpeakingUsers,
};
