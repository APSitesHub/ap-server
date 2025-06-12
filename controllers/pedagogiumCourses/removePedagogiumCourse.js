const {
  findPedagogiumCourseByID,
  deletePedagogiumCourse,
} = require("../../services/pedagogiumCoursesServices");

const removePedagogiumCourse = async (req, res) => {
  console.log(
    "Deleting a course",
    await findPedagogiumCourseByID(req.params.id)
  );
  res.status(204).json(await deletePedagogiumCourse(req.params.id));
};

module.exports = removePedagogiumCourse;
