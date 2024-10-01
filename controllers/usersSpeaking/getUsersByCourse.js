const { allCourseUsers } = require("../../services/scUsersServices");

const getUsersByCourse = async (req, res) => {
  console.log(req.query);

  return res.json(await allCourseUsers(req.query));
};

module.exports = getUsersByCourse;
