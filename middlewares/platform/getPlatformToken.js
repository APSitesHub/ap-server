const axios = require("axios");
const { findUser } = require("../../services/usersServices");

const getPlatformToken = async (req, res, next) => {
  const { mail } = req.body;
  const user = await findUser({ mail });

  if (!user) {
    console.log("!no such user");
    return res.status(401).json("Login or password is wrong");
  }

  if (user.pupilId === "0000000") {
    console.log(14, "!trial user");
    next();
  }

  const updateLeadStatusRequest = {
    pupilId: user.pupilId,
  };

  console.log("getPlatformToken 22", updateLeadStatusRequest);

  try {
    axios.defaults.headers.common[
      "Authorization"
    ] = `${process.env.PLATFORM_KEY}`;
    const platformToken = await axios.post(
      `https://edvibe.com/school-api/api/UserAuth/LoginPupil`,
      updateLeadStatusRequest
    );
    console.log(24, platformToken.data.data.sessionToken);

    req.body.authToken = platformToken.data.data.sessionToken;
    next();
  } catch (error) {
    console.log(error.code);
  }
};

module.exports = getPlatformToken;
