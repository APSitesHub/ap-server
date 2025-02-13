const axios = require("axios");
const { findTeacher } = require("../../services/teachersServices");

const getTeacherPlatformToken = async (req, res, next) => {
  const { login } = req.body;
  const teacher = await findTeacher({ login });

  if (!teacher) {
    console.log("!no such teacher");
    return res.status(401).json("Login or password is wrong");
  }

  const updateLeadStatusRequest = {
    // teacherId: teacher.teacherId,
    teacherId: 2298518,
  };

  try {
    axios.defaults.headers.common[
      "Authorization"
    ] = `${process.env.PLATFORM_KEY}`;
    const platformToken = await axios.post(
      `https://online.ap.education/school-api/api/UserAuth/LoginTeacher`,
      updateLeadStatusRequest
    );
    if (!platformToken.data.data.sessionToken) {
      console.log(14, "!No such teacher");
    }

    req.body.authToken = platformToken.data.data.sessionToken;
    next();
  } catch (error) {
    console.log(42, error);
    next();
  }
};

module.exports = getTeacherPlatformToken;
