const jwt = require("jsonwebtoken");
const { signInUser, findUser } = require("../../services/usersServices");

const refreshUserTokenByAuthCode = async (req, res, next) => {
  const { authCode } = req.body;
  console.log(6, req.body);

  const user = await findUser({ authCode });
  console.log('user', user);
  if (!user) {
    return res.status(401).json("No authorization code!");
  }

  const isTokenOK = jwt.verify(user.token, process.env.SECRET);
  if (!isTokenOK) {
    return res.status(401).json("Authorization token is wrong!");
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
  const mail = user.mail;
  const name = user.name;
  const course = user.course;
  const lang = user.lang;
  const points = user.points;
  const pupilId = user.pupilId;
  const knowledge = user.knowledge;

  try {
    await signInUser(user._id, { visited, visitedTime, token: newToken });
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({
    newToken,
    user: {
      mail,
      name,
      visited,
      visitedTime,
      lang,
      course,
      points,
      pupilId,
      knowledge,
    },
  });
};

module.exports = refreshUserTokenByAuthCode;
