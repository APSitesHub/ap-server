const jwt = require("jsonwebtoken");
const { signInUser, findUser } = require("../../services/usersServices");
const { updateLoginTime } = require("../../services/crm/updateCRMLead");

const refreshUserToken = async (req, res, next) => {
  try {
    const { mail } = req.body;
  console.log(req.body);
  const user = await findUser({ mail });
  console.log(user);
  if (!user) {
    next();
  }
  console.log(user.updatedAt.toDateString());
  try {
    const isTokenOK = jwt.verify(user.token, process.env.SECRET);
    console.log("verify jwt", isTokenOK);
  } catch (error) {
    console.log(error);
  }

  const payload = { id: user._id };
  const newToken = jwt.sign(payload, process.env.SECRET, { expiresIn: "12h" });
  const visitDate = `${new Date().toLocaleDateString("uk-UA")}`;

  user.visited.includes(visitDate)
    ? user.visited
    : user.visited.length === 365
    ? user.visited.shift() && user.visited.push(visitDate)
    : user.visited.push(visitDate);

  const visitTimeDate = `${new Date().toISOString()}`;

  user.visitedTime.includes(visitTimeDate)
    ? user.visitedTime
    : user.visitedTime.length === 365
    ? user.visitedTime.shift() && user.visitedTime.push(visitTimeDate)
    : user.visitedTime.push(visitTimeDate);

  const id = user._id;
  const crmId = user.crmId;
  const contactId = user.contactId;
  const visited = user.visited;
  const visitedTime = user.visitedTime;
  const name = user.name;
  const zoomMail = user.zoomMail;
  const age = user.age;
  const course = user.course;
  const package = user.package;
  const lang = user.lang;
  const points = user.points;
  const pupilId = user.pupilId;
  const knowledge = user.knowledge;
  const marathonNumber = user.marathonNumber;
  const temperament = user.temperament;
  const successRate = user.successRate;
  const feedback = user.feedback;
  const platformToken = req.body.authToken;

  try {
    await signInUser(user._id, { visitedTime, token: newToken });
  } catch (error) {
    console.log(error);
  }

  const requestedUrl = req.get("X-Page-URL");

  if(requestedUrl && requestedUrl.length && requestedUrl.includes("/streams")) {
    updateLoginTime(crmId, user);
  }

  res.status(200).json({
    newToken,
    user: {
      id,
      crmId,
      contactId,
      mail,
      zoomMail,
      name,
      age,
      visited,
      visitedTime,
      lang,
      course,
      package,
      points,
      pupilId,
      knowledge,
      marathonNumber,
      temperament,
      successRate,
      feedback,
      platformToken,
    },
  });
  } catch (error) {
    console.log('Error with refreshUserToken:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = refreshUserToken;
