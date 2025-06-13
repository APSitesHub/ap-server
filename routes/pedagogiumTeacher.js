const express = require("express");

const {
  validatePedagogiumTeacher,
} = require("../schema/pedagogiumTeachersSchema");

const authTeacherAdmin = require("../middlewares/streams/authTeacherAdmin");

const getAllTeachers = require("../controllers/pedagogiumTeachers/getAllTeachers");
const getOneTeacher = require("../controllers/pedagogiumTeachers/getOneTeacher");
const addTeacher = require("../controllers/pedagogiumTeachers/addTeacher");
const removeTeacher = require("../controllers/pedagogiumTeachers/removeTeacher");
const loginTeacher = require("../controllers/pedagogiumTeachers/loginTeacher");
const refreshTeacherToken = require("../controllers/pedagogiumTeachers/refreshTeacherToken");
const editTeacher = require("../controllers/pedagogiumTeachers/editTeacher");
const getPedagogiumTeacherPlatformToken = require("../middlewares/platform/getPedagogiumTeacherPlatformToken");

const router = express.Router();

router.get("/", authTeacherAdmin, getAllTeachers);

router.get("/:id", authTeacherAdmin, getOneTeacher);

router.post("/new", validatePedagogiumTeacher, addTeacher);

router.delete("/:id", removeTeacher);

router.post(
  "/login",
  validatePedagogiumTeacher,
  getPedagogiumTeacherPlatformToken,
  loginTeacher
);

router.post("/refresh", getPedagogiumTeacherPlatformToken, refreshTeacherToken);

router.put("/:id", validatePedagogiumTeacher, editTeacher);

module.exports = router;
