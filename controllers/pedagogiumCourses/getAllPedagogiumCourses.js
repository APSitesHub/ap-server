const {
  allPedagogiumCourses,
} = require("../../services/pedagogiumCoursesServices");

const getAllPedagogiumCourses = async (_, res) => {
  return res.json(await allPedagogiumCourses());
};

module.exports = getAllPedagogiumCourses;
