const express = require("express");

const { validateTeacher } = require("../schema/teachersSchema");

const getAllTeachers = require("../controllers/teachers/getAllTeachers");
const getOneTeacher = require("../controllers/teachers/getOneTeacher");
const addTeacher = require("../controllers/teachers/addTeacher");
const removeTeacher = require("../controllers/teachers/removeTeacher");
const loginTeacher = require("../controllers/teachers/loginTeacher");
const refreshTeacherToken = require("../controllers/teachers/refreshTeacherToken");
const editTeacher = require("../controllers/teachers/editTeacher");

const router = express.Router();

router.get("/:id", getOneTeacher);

router.get("/", getAllTeachers);

router.post("/new", validateTeacher, addTeacher);

router.delete("/:id", removeTeacher);

router.post("/login", validateTeacher, loginTeacher);

router.post("/refresh", refreshTeacherToken);

router.put("/:id", validateTeacher, editTeacher);

module.exports = router;
