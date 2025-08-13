const {
  findAppointmentsByStudent,
} = require("../../services/altegio/altegioAppointmentsServices");

const getAllAppointmentsByStudent = async (req, res) => {
  return res.json(await findAppointmentsByStudent(req.query));
};

module.exports = getAllAppointmentsByStudent;
