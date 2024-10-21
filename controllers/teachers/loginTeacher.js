const jwt = require("jsonwebtoken");
const {
  signInTeacher,
  findTeacher,
} = require("../../services/teachersServices");

const loginTeacher = async (req, res, next) => {
  const { login, password } = req.body;
  console.log(req.body);
  const teacher = await findTeacher({ login });
  console.log(teacher);
  if (!teacher) {
    console.log("!no such teacher");
    res.status(401).json("Login or password is wrong");
  }

  const validatedPassword = password === teacher.password;
  if (!validatedPassword) {
    console.log("!passwords don't match");
    res.status(401).json("Login or password is wrong");
  }

  const payload = { id: teacher._id };
  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "12h" });
  const visitDate = `${new Date().toLocaleDateString("uk-UA")}`;

  teacher.visited.includes(visitDate)
    ? teacher.visited
    : teacher.visited.length === 100
    ? teacher.visited.shift() && teacher.visited.push(visitDate)
    : teacher.visited.push(visitDate);

  const visitTimeDate = `${new Date().toISOString()}`;

  teacher.visitedTime.includes(visitTimeDate)
    ? teacher.visitedTime
    : teacher.visitedTime.length === 100
    ? teacher.visitedTime.shift() && teacher.visitedTime.push(visitTimeDate)
    : teacher.visitedTime.push(visitTimeDate);

  const id = teacher._id;
  const visited = teacher.visited;
  const visitedTime = teacher.visitedTime;
  const name = teacher.name;

  try {
    await signInTeacher(user._id, { token, visited, visitedTime });
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({
    token,
    user: {
      id,
      login,
      name,
      visited,
      visitedTime,
    },
  });
};

module.exports = loginTeacher;
