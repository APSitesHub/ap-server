const {
  findPedagogiumCourse,
} = require("../../services/pedagogiumCoursesServices");

const getPedagogiumCourse = async (req, res) => {
  return res.json(await findPedagogiumCourse(req.body));
};

module.exports = getPedagogiumCourse;
