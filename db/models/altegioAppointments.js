const { Schema, model } = require("mongoose");

const altegioAppointments = new Schema(
  {
    appointmentId: {
      type: String,
      required: [true, "No appointmentId"],
    },
    leadId: {
      type: String,
      required: [true, "No leadId"],
    },
    teacherId: {
      type: String,
      required: [true, "No teacherId"],
    },
    serviceId: {
      type: String,
      required: [true, "No serviceId"],
    },
    startDateTime: {
      type: Date,
      required: [true, "No startDateTime"],
    },
    endDateTime: {
      type: Date,
      required: [true, "No endDateTime"],
    },
    available: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const AltegioAppointments = model("altegio-appointments", altegioAppointments);

module.exports = AltegioAppointments;
