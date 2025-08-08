const {
  findAppointments,
} = require("../../services/altegio/altegioAppointmentsServices");

const getAllAppointments = async (req, res) => {
  return res.json(await findAppointments(req.query));
};

module.exports = getAllAppointments;
