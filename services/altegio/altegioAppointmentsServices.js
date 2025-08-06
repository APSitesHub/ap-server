const AltegioAppointments = require("../../db/models/altegioAppointments");

const newAppointment = async (body) => {
  return await AltegioAppointments(body).save();
};

const updateAppointment = async (appintmentId, body) => {
  return await AltegioAppointments.findOneAndUpdate(appintmentId, body, {
    new: true,
  });
};

module.exports = {
  newAppointment,
  updateAppointment,
};
