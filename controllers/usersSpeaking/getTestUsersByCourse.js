const { allCourseTestScUsers } = require("../../services/testScUsersServices");

const getTestUsersByCourse = async (req, res) => {
  console.log(req.query);

  return res.json(await allCourseTestScUsers(req.query));
};

module.exports = getTestUsersByCourse;
