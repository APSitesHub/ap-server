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
  try {
    const { lang } = req.query;
    switch (lang) {
      case "en": {
        return res.status(200).json(await allUsersPlatformENG());
      }
      case "pl": {
        return res.status(200).json(await allUsersPlatformPL());
      }
      case "de": {
        return res.status(200).json(await allUsersPlatformDE());
      }
      case "enkids": {
        return res.status(200).json(await allUsersPlatformENGKIDS());
      }
      case "plkids": {
        return res.status(200).json(await allUsersPlatformPLKIDS());
      }
      case "dekids": {
        return res.status(200).json(await allUsersPlatformDEKIDS());
      }
      default: {
        return res.status(200).json(await allUsersPlatform());
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getAllUsersPlatformData,
  getAllUsers,
  getC1SpeakingUsers,
};
