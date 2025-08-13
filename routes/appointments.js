const express = require("express");

const getAllAppointments = require("../controllers/appointments/getAllAppointments");
const getAllAppointmentsByStudent = require("../controllers/appointments/getAllAppointmentsByStudent");

const router = express.Router();

router.get("/", getAllAppointments);

router.get("/student", getAllAppointmentsByStudent);

module.exports = router;
