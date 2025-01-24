const jwt = require("jsonwebtoken");
const {
  findUniUser,
  signInUniUser,
} = require("../../services/uniUsersServices");

const refreshUniUserToken = async (req, res, next) => {
  const { mail } = req.body;
  console.log(6, "platform", req.body);
  const user = await findUniUser({ mail });
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
    next();
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
  const pupilId = user.pupilId;
  const marathonId = user.marathonId;
  const platformToken = req.body.authToken;

  try {
    await signInUniUser(user._id, { visited, visitedTime, token: newToken });
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({
    newToken,
    user: {
      id,
      crmId,
      contactId,
      mail,
      name,
      visited,
      visitedTime,
      pupilId,
      marathonId,
      platformToken,
    },
  });
};

module.exports = refreshUniUserToken;
