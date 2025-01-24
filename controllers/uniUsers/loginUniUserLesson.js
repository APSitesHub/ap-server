const jwt = require("jsonwebtoken");
const { findUniUser, signInUniUser } = require("../../services/uniUsersServices");

const loginUniUserLesson = async (req, res) => {
  const { mail, password } = req.body;
  console.log(6, 'lesson', req.body);
  const user = await findUniUser({ mail });
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

  user.visited.includes(`${visitDate} lesson`)
    ? user.visited
    : user.visited.length === 365
    ? user.visited.shift() && user.visited.push(`${visitDate} lesson`)
    : user.visited.push(`${visitDate} lesson`);

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
    await signInUniUser(user._id, { token, visited, visitedTime });
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
      name,
      visited,
      visitedTime,
      pupilId,
      marathonId,
      platformToken,
    },
  });
};

module.exports = loginUniUserLesson;
