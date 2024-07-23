const jwt = require("jsonwebtoken");
const {
  findTrialUser,
  signInTrialUser,
  newTrialUser,
} = require("../../services/trialUsersServices");

const loginTrialUser = async (req, res, next) => {
  const { name, lang, knowledge } = req.body;
  console.log(req.body);
  let user = await findTrialUser({ name });
  console.log(user);

  if (!user) {
    user = await newTrialUser({ ...req.body });
  }

  const payload = { id: user?._id || newUser._id};
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

  const visited = user.visited;
  const visitedTime = user.visitedTime;

  try {
    await signInTrialUser(user._id, { token, visited, visitedTime });
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({
    token,
    user: {
      name,
      visited,
      visitedTime,
      lang,
      knowledge,
    },
  });
};

module.exports = loginTrialUser;
