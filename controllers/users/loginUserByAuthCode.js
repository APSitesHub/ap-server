const jwt = require("jsonwebtoken");
const { signInUser, findUser } = require("../../services/usersServices");

const loginUserByAuthCode = async (req, res, next) => {
  const { authCode } = req.body;
  const user = await findUser({ authCode });
  console.log(user);
  if (!user) {
    console.log("!no such user");
    return res.status(401).json("Authorization code is wrong!");
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "12h" });
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

  const mail = user.mail;
  const crmId = user.crmId;
  const visited = user.visited;
  const visitedTime = user.visitedTime;
  const name = user.name;
  const course = user.course;
  const lang = user.lang;
  const points = user.points;
  const pupilId = user.pupilId;
  const knowledge = user.knowledge;

  try {
    await signInUser(user._id, { token, visited, visitedTime });
    req.body = {
      token,
      user: {
        mail,
        crmId,
        name,
        visited,
        visitedTime,
        lang,
        course,
        points,
        pupilId,
        knowledge,
      },
    };
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = loginUserByAuthCode;
