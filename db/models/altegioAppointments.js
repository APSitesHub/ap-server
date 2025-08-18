const { Schema, model } = require("mongoose");

/**
 * AltegioAppointments Schema
 *
 * Represents an appointment in the Altegio system.
 *
 * @typedef {Object} AltegioAppointments
 * @property {string} appointmentId - Unique identifier for the appointment. Required.
 * @property {string} leadId - Unique identifier for the lead. Required.
 * @property {string} leadName - Name of the lead. Required.
 * @property {string} teacherId - Unique identifier for the teacher. Required.
 * @property {string} teacherName - Name of the teacher. Required.
 * @property {string} serviceId - Unique identifier for the service. Required.
 * @property {string} serviceName - Name of the service. Required.
 * @property {Date} startDateTime - Start date and time of the appointment. Required.
 * @property {Date} endDateTime - End date and time of the appointment. Required.
 * @property {string} status - Status of the appointment. Required.
 * @property {boolean} [IsTrial=false] - Indicates if the appointment is a trial. Default is false.
 * @property {boolean} [isDeleted=false] - Indicates if the appointment is deleted. Default is false.
 * @property {boolean} [leadPurchasedCourse=false] - Indicates if the lead has purchased a course. Default is false.
 * @property {Date} [courseePurchaseDate] - Date of payment confirmation.
 */
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
    leadPurchasedCourse: { type: Boolean, default: false },
    courseePurchaseDate: { type: Date },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const AltegioAppointments = model("altegio-appointments", altegioAppointments);

module.exports = AltegioAppointments;
