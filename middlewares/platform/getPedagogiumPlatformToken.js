const axios = require("axios");
const { findUniUser } = require("../../services/pedagogiumUsersServices");

const getUniPedagogiumPlatformToken = async (req, res, next) => {
  const { mail } = req.body;
  console.log(mail);

  const user = await findUniUser({ mail });

  if (!user) {
    console.log(11, "!no such user");
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
      `https://online.ap.education/school-api/api/UserAuth/LoginPupil`,
      updateLeadStatusRequest
    );
    console.log(33, platformToken.data);
    if (!platformToken.data.data.sessionToken) {
      console.log(14, "!No such student");
    }
    console.log(24, platformToken.data.data.sessionToken);

    req.body.authToken = platformToken.data.data.sessionToken;
    next();
  } catch (error) {
    console.log(42, error);
    next();
  }
};

module.exports = getUniPedagogiumPlatformToken;
