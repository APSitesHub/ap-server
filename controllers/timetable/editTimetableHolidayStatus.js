const { updateCourseHolidayStatus } = require("../../services/timetableServices");

const editTimetableHolidayStatus = async (req, res) => {
  console.log(req.body);
  
  res.status(200).json(await updateCourseHolidayStatus(req.params.id, req.body));
};

module.exports = editTimetableHolidayStatus;
