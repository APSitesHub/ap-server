const {
  newAppointment,
  updateAppointment,
} = require("../../services/altegio/altegioAppointmentsServices");

async function individualNotifications() {


  try {
    const app = await updateAppointment(
      { appointmentId: "test_appointment_id" },
      {
        leadId: "123",
        teacherId: "123",
        serviceId: "234",
        startDateTime: new Date(),
        endDateTime: new Date(new Date().getTime() + 60 * 60 * 1000),
      }
    );

    console.log(app);
  } catch (error) {
    console.error("Error creating appointment:", error);
  }
}

module.exports = individualNotifications;
