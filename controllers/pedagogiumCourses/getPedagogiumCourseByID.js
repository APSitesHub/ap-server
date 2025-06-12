const {
  findPedagogiumCourseByID,
} = require("../../services/pedagogiumCoursesServices");

const getPedagogiumCourseByID = async (req, res) => {
  return res.json(await findPedagogiumCourseByID(req.params.id));
};

module.exports = getPedagogiumCourseByID;
