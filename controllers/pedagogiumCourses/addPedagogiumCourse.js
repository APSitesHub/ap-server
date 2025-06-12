const {
  newPedagogiumCourse,
} = require("../../services/pedagogiumCoursesServices");

const addPedagogiumCourse = async (req, res) => {
  console.log("addPedagogiumCourse", req.body);
  res.status(201).json(await newPedagogiumCourse({ ...req.body }));
};

module.exports = addPedagogiumCourse;
