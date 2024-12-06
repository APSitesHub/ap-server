const express = require("express");

const { validateTeacher } = require("../schema/teachersSchema");

const authTeacherAdmin = require("../middlewares/streams/authTeacherAdmin");

const getAllTeachers = require("../controllers/teachers/getAllTeachers");
const getAllTeachersEn = require("../controllers/teachers/getAllTeachersEn");
const getAllTeachersDe = require("../controllers/teachers/getAllTeachersDe");
const getAllTeachersPl = require("../controllers/teachers/getAllTeachersPl");
const getOneTeacher = require("../controllers/teachers/getOneTeacher");
const addTeacher = require("../controllers/teachers/addTeacher");
const removeTeacher = require("../controllers/teachers/removeTeacher");
const loginTeacher = require("../controllers/teachers/loginTeacher");
const refreshTeacherToken = require("../controllers/teachers/refreshTeacherToken");
const editTeacher = require("../controllers/teachers/editTeacher");
const addTeachersBulk = require("../controllers/teachers/addTeachersBulk");

const router = express.Router();

router.get("/", authTeacherAdmin, getAllTeachers);

router.get("/en", authTeacherAdmin, getAllTeachersEn);

router.get("/de", authTeacherAdmin, getAllTeachersDe);

router.get("/pl", authTeacherAdmin, getAllTeachersPl);

router.get("/:id", authTeacherAdmin, getOneTeacher);

router.post("/new", validateTeacher, addTeacher);

router.post("/bulk", addTeachersBulk);

router.delete("/:id", removeTeacher);

router.post("/login", validateTeacher, loginTeacher);

router.post("/refresh", refreshTeacherToken);

router.put("/:id", validateTeacher, editTeacher);

module.exports = router;
