const jwt = require("jsonwebtoken");
const { signInUser, findUser } = require("../../services/usersServices");

const loginUser = async (req, res, next) => {
  const { mail, password } = req.body;
  console.log(6, req.body);
  const user = await findUser({ mail });
  console.log(user);
  if (!user) {
    console.log("!no such user");
    res.status(401).json("Login or password is wrong");
  }

  const validatedPassword = password === user.password;
  if (!validatedPassword) {
    console.log("!passwords don't match");
    return res.status(401).json("Login or password is wrong");
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

  const id = user._id;
  const crmId = user.crmId;
  const contactId = user.contactId;
  const visited = user.visited;
  const visitedTime = user.visitedTime;
  const name = user.name;
  const zoomMail = user.zoomMail;
  const course = user.course;
  const package = user.package;
  const lang = user.lang;
  const points = user.points;
  const pupilId = user.pupilId;
  const knowledge = user.knowledge;
  const marathonNumber = user.marathonNumber;
  const age = user.age;
  const temperament = user.temperament;
  const successRate = user.successRate;
  const feedback = user.feedback;
  const platformToken = req.body.authToken;

  try {
    await signInUser(user._id, { token, visited, visitedTime });
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({
    token,
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
};

module.exports = loginUser;
