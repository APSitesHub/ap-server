const jwt = require("jsonwebtoken");
const {
  findUniUser,
  signInUniUser,
} = require("../../services/pedagogiumUsersServices");

const loginUniUser = async (req, res) => {
  const { mail, password } = req.body;
  console.log(6, "platform", req.body);
  const user = await findUniUser({ mail });
  console.log(user);
  if (!user) {
    console.log("!no such user");
    return res.status(401).json("Login or password is wrong");
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
  const group = user.group || "1";
  const courseName = user.courseName;
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
      group,
      courseName,
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

module.exports = loginUniUser;
