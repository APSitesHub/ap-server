const express = require("express");

const {
  validatePedagogiumCourse,
} = require("../schema/pedagogiumCoursesSchema.js");

const getPedagogiumCourse = require("../controllers/pedagogiumCourses/getPedagogiumCourse.js");
const getAllPedagogiumCourses = require("../controllers/pedagogiumCourses/getAllPedagogiumCourses.js");
const addPedagogiumCourse = require("../controllers/pedagogiumCourses/addPedagogiumCourse.js");
const removePedagogiumCourse = require("../controllers/pedagogiumCourses/removePedagogiumCourse.js");
const editPedagogiumCourse = require("../controllers/pedagogiumCourses/editPedagogiumCourse.js");

const router = express.Router();

router.get("/admin", getAllPedagogiumCourses);

router.get("/:id", getPedagogiumCourse);

router.post("/", validatePedagogiumCourse, addPedagogiumCourse);

router.delete("/:id", removePedagogiumCourse);

router.put("/:id", validatePedagogiumCourse, editPedagogiumCourse);

module.exports = router;
