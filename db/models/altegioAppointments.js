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
    leadName: {
      type: String,
      required: [true, "No leadName"],
    },
    teacherId: {
      type: String,
      required: [true, "No teacherId"],
    },
    teacherName: {
      type: String,
      required: [true, "No teacherName"],
    },
    serviceId: {
      type: String,
      required: [true, "No serviceId"],
    },
    serviceName: {
      type: String,
      required: [true, "No serviceName"],
    },
    startDateTime: {
      type: Date,
      required: [true, "No startDateTime"],
    },
    endDateTime: {
      type: Date,
      required: [true, "No endDateTime"],
    },
    status: {
      type: String,
      required: [true, "No status"],
    },
    IsTrial: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const AltegioAppointments = model("altegio-appointments", altegioAppointments);

module.exports = AltegioAppointments;
