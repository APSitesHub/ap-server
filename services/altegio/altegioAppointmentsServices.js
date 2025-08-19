const AltegioAppointments = require("../../db/models/altegioAppointments");

const findAppointments = async ({ start, end }) =>
  await AltegioAppointments.find({
    startDateTime: {
      $gte: start,
      $lte: end,
    },
  });

const findAppointmentsByStudent = async ({ leadId, start, end, IsTrial }) =>
  await AltegioAppointments.find({
    leadId: leadId,
    startDateTime: {
      $gte: start,
      $lte: end,
    },
    IsTrial: IsTrial,
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
  findAppointmentsByStudent,
  newAppointment,
  updateAppointment,
};
