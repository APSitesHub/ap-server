const jwt = require("jsonwebtoken");
const {
  signInTrialUser,
  findTrialUser,
} = require("../../services/trialUsersServices");

const refreshTrialUserToken = async (req, res, next) => {
  const { name, userId } = req.body;
  console.log(9, req.body);
  const user = await findTrialUser({
    name: req.body.name,
    userId: req.body.userId,
  });
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

  const visited = user.visited;
  const visitedTime = user.visitedTime;
  const lang = user.lang;
  const knowledge = user.knowledge;

  try {
    await signInTrialUser(user._id, { visited, visitedTime, token: newToken });
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({
    newToken,
    user: {
      userId,
      name,
      visited,
      visitedTime,
      lang,
      knowledge,
    },
  });
};

module.exports = refreshTrialUserToken;
