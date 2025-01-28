const express = require("express");

const authTeacher = require("../middlewares/streams/authTeacher");

const createRoom = require("../controllers/videochatRooms/createRoom");
const getAllTeacherRooms = require("../controllers/videochatRooms/getAllTeacherRooms");
const isRoomAdmin = require("../controllers/videochatRooms/isRoomAdmin");

const router = express.Router();

router.post("/create", authTeacher, createRoom);

router.get("/byTeacher", authTeacher, getAllTeacherRooms);

router.get("/isRoomAdmin", authTeacher, isRoomAdmin);

module.exports = router;
