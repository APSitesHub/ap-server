const { allCourseTestScUsers } = require("../../services/testScUsersServices");

const getTestUsersByCourse = async (req, res) => {

  return res.json(await allCourseTestScUsers(req.query));
};

module.exports = getTestUsersByCourse;
