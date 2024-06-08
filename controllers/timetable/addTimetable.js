const { newTimetable } = require("../../services/timetableServices");

const addTimetable = async (req, res) => res.status(201).json(await newTimetable(req.body));

module.exports = addTimetable;
