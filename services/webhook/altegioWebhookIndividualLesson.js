/* eslint-disable camelcase */
const axios = require("axios");
const {
  format,
  parseISO,
  setHours,
  setMinutes,
  setSeconds,
} = require("date-fns");
const { uk, id } = require("date-fns/locale");
const { DateTime } = require("luxon");
const { prepareLessonRoom } = require("../prepareLessonRoom");
const { findTeacherByAltegioID } = require("../teachersServices");
const {
  newAppointment,
  updateAppointment,
} = require("../altegio/altegioAppointmentsServices");

// Ід сервісів для індивідуальних уроків. За ними генеруються лінки для Altegio
const IndividualServicesList = [
  12508353, 12508351, 12508345, 12508341, 12508338, 12508335, 12508333,
  12508332, 12508328, 12508323, 12508321, 12508315, 12508378, 12508377,
  12508374, 12508373, 12508372, 12508369, 12508368, 12508367, 12508364,
  12508363, 12508362, 12508358, 12491752, 12465061, 12465060, 12465059,
  12465058, 12428677, 12293015, 12293013, 12293007, 12293006, 12293004,
  12292994, 12292993, 12292992, 12292987, 12292985, 12292983, 12292980,
  12508569, 12508568, 12508562, 12508559, 12508556, 12508553, 12508552,
  12508551, 12508546, 12508545, 12508544, 12508538, 12508741, 12508740,
  12508736, 12508733, 12508732, 12508728, 12508727, 12508725, 12508719,
  12508718, 12508717, 12508714, 12465071, 12465070, 12465069, 12465068,
  12291800, 12291799, 12291793, 12291790, 12291789, 12291785, 12291784,
  12291783, 12291778, 12291776, 12291775, 12291769, 12484999, 12484998,
  12484996, 12484995, 12392219, 12392217, 12392213, 12291833, 12291831,
  12291826, 12291825, 12291824, 12291821, 12291820, 12291819, 12291813,
  12291812, 12291811, 12291806, 12465065, 12465064, 12465063, 12465062,
  12292346, 12292344, 12292337, 12292309, 12292307, 12292300, 12292298,
  12292296, 12292284, 12292280, 12292279, 12292268, 12485005, 12485004,
  12485003, 12485002, 12392244, 12392242, 12392240, 12292388, 12292387,
  12292381, 12292379, 12292377, 12292376, 12292373, 12292355, 12292354,
  12292347, 12292332, 12292327, 12292318, 12466027, 12466026, 12466021,
  12466012, 12466010, 12466002, 12465939, 12465937, 12465933, 12465932,
  12465931, 12465927, 12466089, 12466087, 12466083, 12466073, 12466072,
  12466060, 12466057, 12466055, 12466049, 12466046, 12466042,
];

function parseUserName(userName) {
  const words = userName.trim().split(/\s+/); // розбиває за пробілами
  let leadId = "";
  const nameParts = [];

  for (const word of words) {
    if (!leadId && /^\d+$/.test(word)) {
      leadId = word;
    } else {
      nameParts.push(word);
    }
  }

  return {
    leadId,
    leadName: nameParts.join(" "),
  };
}

// Webhook обробник для Altegio
const altegioWebhookIndividualLesson = async (req, res) => {
  console.log(
    "Received altegioWebhookIndividualLesson webhook request for individual lesson:",
    req.body.data.id
  );

  try {
    const { status, resource, data } = req.body;
    const { leadId, leadName } = parseUserName(data.client?.name || "");
    const visit_attendance = data.visit_attendance; // 0(Pending) | 1(Arrived) | -1(No-show) | 2(Confirmed)
    const date = new Date(data.date);
    const startDateTime = DateTime.fromJSDate(date, {
      zone: "Europe/Kyiv",
    }).toISO();
    const endDateTime = DateTime.fromJSDate(
      new Date(date.getTime() + data.seance_length * 1000),
      {
        zone: "Europe/Kyiv",
      }
    ).toISO();

    if (!leadName) {
      return res.status(200).json({ message: "Invalid client name" });
    }
    const isIndividualLesson = data.services.some((service) =>
      IndividualServicesList.includes(service.id)
    );
    if (!isIndividualLesson) {
      return res
        .status(200)
        .json({ message: "Not a individual-lesson service" });
    }
    // Логіка обробки запису

    if (resource !== "record") {
      return res
        .status(200)
        .json({ message: "Resource is not a record", status: "badRequest" });
    }

    if (status === "create") {
      try {
        // додавання в БД

        if (leadId) {
          await newAppointment({
            appointmentId: data.id,
            leadId,
            leadName,
            teacherId: data.staff.id,
            teacherName: data.staff.name,
            serviceId: data.services[0].id,
            serviceName: data.services[0].title,
            startDateTime,
            endDateTime,
            status: visit_attendance,
          });
        }
      } catch (e) {
        console.error(e);
      }
      try {
        const teacher = await findTeacherByAltegioID(data.staff_id);
        if (!teacher) {
          return res.status(200).json({
            message: "Teacher not found",
            status: "badRequest",
          });
        }
        const roomLink = await prepareLessonRoom(teacher);

        const appointment = {
          id: data.id,
          staff_id: data.staff_id,
          services: data.services,
          datetime: data.date,
          seance_length: data.seance_length,
          client: data.client,
        };
        await updateIndividualLesson(appointment, roomLink, teacher);

        return res.status(200).json({
          message: "Individual lesson booked successfully",
        });
      } catch (error) {
        console.error("Error preparing lesson room:", error);
        return res.status(200).json({
          message: "Error preparing lesson room",
          status: "badRequest",
        });
      }
    }

    if (status === "update") {
      try {
        await updateAppointment(
          {
            appointmentId: data.id,
          },
          {
            leadId,
            teacherId: data.staff.id,
            serviceId: data.services[0].id,
            startDateTime,
            endDateTime,
            status: visit_attendance,
          }
        );
      } catch (e) {
        console.error(e);
      }
    }

    if (status === "update" && visit_attendance === 0) {
      // Якщо статус оновлення і відвідування не відбулося
      const teacher = await findTeacherByAltegioID(data.staff_id);
      const match = data.comment.match(
        /Логін і пароль на платформу:\s*Логін:\s*(\S+)/
      );
      const prevTeacher = match ? match[1] : null;

      if (teacher.login === prevTeacher) {
        return res.status(200).json({
          message: "No changes needed for the lesson",
        });
      }

      const roomLink = await prepareLessonRoom(teacher);
      const appointment = {
        id: data.id,
        staff_id: data.staff_id,
        services: data.services,
        datetime: data.date,
        seance_length: data.seance_length,
        client: data.client,
      };
      await updateIndividualLesson(appointment, roomLink, teacher);
    }

    if (status === "delete") {
      try {
        await updateAppointment(
          {
            appointmentId: data.id,
          },
          {
            isDeleted: true,
          }
        );
      } catch (e) {
        console.error(e);
      }
    }

    // Якщо жодна умова не виконана
    return res.status(200).json({ message: "No action required" });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return res
      .status(200)
      .json({ message: "Internal server error", status: "badRequest" });
  }
};

async function updateIndividualLesson(appointment, roomLink, teacher) {
  const updatedAppointmemtBody = {
    ...appointment,
    comment: `Посилання на урок: ${roomLink}

Логін і пароль на платформу:
  Логін: ${teacher.login}
  Пароль: ${teacher.password}

Логін і пароль організатора відеочату:
  Логін: ${process.env.HOST_USERNAME}
  Пароль: ${process.env.HOST_PASSWORD}
`,
  };

  try {
    await axios.put(
      `https://api.alteg.io/api/v1/record/${process.env.ALTEGIO_COMPANY_ID}/${appointment.id}`,
      updatedAppointmemtBody,
      {
        headers: {
          Accept: "application/vnd.api.v2+json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ALTEGIO_COMPANY_TOKEN}, User ${process.env.ALTEGIO_USER_TOKEN}`,
        },
      }
    );
  } catch (error) {
    console.error("Error lesson updating:", error);
    throw new Error("Failed to update lesson in Altegio");
  }
}

module.exports = {
  altegioWebhookIndividualLesson,
};
