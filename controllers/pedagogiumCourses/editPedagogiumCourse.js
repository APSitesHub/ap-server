const {
  updatePedagogiumCourse,
} = require("../../services/pedagogiumCoursesServices");

const editPedagogiumCourse = async (req, res) => {
  res.status(200).json(await updatePedagogiumCourse(req.params.id, req.body));
};

module.exports = editPedagogiumCourse;
