const AltegioAppointments = require("../../db/models/altegioAppointments");

const findAppointments = async ({ start, end }) =>
  await AltegioAppointments.find({
    startDateTime: {
      $gte: start,
      $lte: end,
    },
  });

const newAppointment = async (body) => {
  return await AltegioAppointments(body).save();
};

const updateAppointment = async (appointmentId, body) => {
  return await AltegioAppointments.findOneAndUpdate(appointmentId, body, {
    new: true,
  });
};

module.exports = {
  findAppointments,
  newAppointment,
  updateAppointment,
};
