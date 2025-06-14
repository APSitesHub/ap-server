const jwt = require("jsonwebtoken");
const {
  signInTeacher,
  findTeacher,
} = require("../../services/pedagogiumTeachersServices");

const refreshTeacherToken = async (req, res, next) => {
  const { login } = req.body;
  console.log(req.body);
  const teacher = await findTeacher({ login });
  console.log(teacher);
  if (!teacher) {
    next();
  }
  console.log(teacher.updatedAt.toDateString());

  try {
    const isTokenOK = jwt.verify(teacher.token, process.env.SECRET);
    console.log("verify jwt", isTokenOK);
  } catch (error) {
    console.log(error);
  }

  const payload = { id: teacher._id };
  const newToken = jwt.sign(payload, process.env.SECRET, { expiresIn: "12h" });
  const visitDate = `${new Date().toLocaleDateString("uk-UA")}`;

  teacher.visited.includes(visitDate)
    ? teacher.visited
    : teacher.visited.length === 365
    ? teacher.visited.shift() && teacher.visited.push(visitDate)
    : teacher.visited.push(visitDate);

  const visitTimeDate = `${new Date().toISOString()}`;

  teacher.visitedTime.includes(visitTimeDate)
    ? teacher.visitedTime
    : teacher.visitedTime.length === 365
    ? teacher.visitedTime.shift() && teacher.visitedTime.push(visitTimeDate)
    : teacher.visitedTime.push(visitTimeDate);

  const id = teacher._id;
  const visited = teacher.visited;
  const visitedTime = teacher.visitedTime;
  const name = teacher.name;
  const platformToken = req.body.authToken;

  try {
    await signInTeacher(teacher._id, { visited, visitedTime, token: newToken });
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({
    newToken,
    teacher: {
      id,
      login,
      name,
      visited,
      visitedTime,
      platformToken,
    },
  });
};

module.exports = refreshTeacherToken;
