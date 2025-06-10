/* eslint-disable camelcase */
const axios = require("axios");
const getCRMLead = require("../crmGetLead");
const { getToken } = require("../tokensServices");
const { sendMessageToChat } = require("../botTelegram");
const {
  format,
  parseISO,
  setHours,
  setMinutes,
  setSeconds,
} = require("date-fns");
const { uk, id } = require("date-fns/locale");
const { prepareLessonRoom } = require("../prepareLessonRoom");

const SalesServicesIdList = [
  10669989, 10669992, 10669994, 12452584, 12452585, 12460475, 12035570,
  11004387,
];

const LevelDefinitionIdList = [
  12500073, 12318088, 12287043, 12287042, 12186844, 12186843, 12186842,
  12186841, 12186840, 12186839, 12186838, 12186837,
];

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

// Number is time when will be level Definition
const LevelDefinition = {
  English_Adult_19: 12186837,
  English_Adult_20: 12186838,
  English_Kids_20: 12186839,
  Polish_Adult_20: 12186840,
  German_Adult_19: 12186841,
  German_Adult_20: 12186842,
  German_Kids_17: 12186843,
  German_Kids_16: 12318088,
  German_Adult_17: 12500073,
};

const LinkMapTrial = {
  English: {
    Adult: {
      19: {
        link: "https://academy.ap.education/room/trial/a2free/fc682e2e-f8ef-4bbf-89fc-55171c225466",
        lvl: "A2_B1",
        CRMslug: "Англійська дорослі 19:00",
      },
      20: {
        link: "https://academy.ap.education/room/trial/a1free/8c7f04bd-5116-42f7-bb43-3157d642bbc1", // ''
        lvl: "A0_A1",
        CRMslug: "Англійська дорослі 20:15",
      },
    },
    Kids: {
      20: {
        link: "https://academy.ap.education/room/trial/a1kidsfree/97d38d14-78cf-4ae0-a103-1297311be402",
        lvl: "A0-A1",
        CRMslug: "Англійська діти 20:15",
      },
    },
  },
  Polish: {
    Adult: {
      20: {
        link: "https://us06web.zoom.us/j/81802778703?pwd=fB52J2wXoarnZ94SH2kHiaFzUBkWjH.1",
        lvl: "A0-B1",
        CRMslug: "Польська дорослі 20:15",
      },
    },
  },
  German: {
    Adult: {
      17: {
        link: "https://academy.ap.education/room/trial/deutschfree/7e247c33-8880-4b74-bfdd-fffa1fc32a2f",
        lvl: "A0-B1",
        CRMslug: "Німецька дорослі 17:00",
      },
      19: {
        link: "https://academy.ap.education/room/trial/deutschfree/7e247c33-8880-4b74-bfdd-fffa1fc32a2f",
        lvl: "A0-B1",
        CRMslug: "Німецька дорослі 19:00",
      },
      20: {
        link: "https://academy.ap.education/room/trial/deutschfree/7e247c33-8880-4b74-bfdd-fffa1fc32a2f",
        lvl: "A0-B1",
        CRMslug: "Німецька дорослі 20:00(лише вівторок)",
      },
    },
    Kids: {
      16: {
        link: "https://us06web.zoom.us/j/87075472194?pwd=20qQad4apEADg0SPpbppvgf97EOnzL.1",
        lvl: "A0-B1",
        CRMslug: "Німецька діти 16:00",
      },
      17: {
        link: "https://academy.ap.education/room/trial/dekidsfree/affee4ce-f319-4982-9d29-8ceeb0f4d6f9",
        CRMslug: "Німецька діти 17:00",
      },
    },
  },
};
const PersonalLinkMapTrial = [
  {
    teacherId: 2179564,
    link: "https://academy.ap.education/room/trial/kubrak/ba9a038c-4ff3-4207-9145-eb5f58c6ca75",
  },
  {
    teacherId: 2187135,
    link: "https://academy.ap.education/room/trial/bulavka/e3a3640b-e244-43b6-adfe-1f7abc856e3e",
  },
  {
    teacherId: 2668683,
    link: "https://academy.ap.education/room/trial/ivachevska/2d5704b1-7082-4e54-be77-aec44a5246f5",
  },
  {
    teacherId: 2179578,
    link: "https://academy.ap.education/room/trial/deineka/5e30c8ae-4e36-4f8b-9f36-746b011c19a3",
  },
  {
    teacherId: 2752664,
    link: "https://academy.ap.education/room/trial/nakonechna/a91a6df5-c7bc-4ff9-9ff5-441ea5008a99",
  },
  {
    teacherId: 2768418,
    link: "https://academy.ap.education/room/trial/heinz/a6929ff7-cc08-4f1f-9fc0-0fca316f5745",
  },
  {
    teacherId: 2692855,
    link: "https://academy.ap.education/room/trial/doloka/812e0f63-de29-4d2c-b407-fa0d788e46a0",
  },
  {
    teacherId: 2212152,
    link: "https://academy.ap.education/room/trial/doloka/812e0f63-de29-4d2c-b407-fa0d788e46a0",
  },
];

const C2UTrialId = [12460475];

const Pipeline = {
  sales: 6453287,
  reanimation: 7891256,
};

const Status = {
  salesPiplineBookTestLessonInd: 54980099,
  reanimationPiplineBookTestLessonInd: 71920160,
  salesWasBookTestLessonInd: 58580615,
  reanimationWasBookTestLessonInd: 71920164,
  salesNotWasBookTestLessonInd: 58580611,
  reanimationNotWasBookTestLessonInd: 71920152,
};

const StatusMappingSales = {
  English: 63191344,
  German: 63191348,
  Polish: 63191352,
};

const StatusMappingReanimation = {
  English: 63642560,
  German: 63642552,
  Polish: 63642556,
};


// Webhook обробник для Altegio
const altegioWebhook = async (req, res) => {
  try {
    const { status, resource, data } = req.body;
    const userName = data.client?.name || "";
    const visit_attendance = data.visit_attendance;
    const crmIdMatch = userName.match(/\b\d{4,}\b/);
    const userCrmId = crmIdMatch ? crmIdMatch[0] : null;

    if (!userName) {
      return res.status(200).json({ message: "Invalid client name" });
    }
    const isSalesServices = data.services.some((service) =>
      SalesServicesIdList.includes(service.id)
    );
    const isIndividualLesson = data.services.some((service) =>
      IndividualServicesList.includes(service.id)
    );
    const isLevelDefinition = data.services.some((service) =>
      LevelDefinitionIdList.includes(service.id)
    );
    if (!isSalesServices && !isLevelDefinition && !isIndividualLesson) {
      return res
        .status(200)
        .json({ message: "Not a sales or individual-lesson service" });
    }
    if ((isSalesServices || isLevelDefinition) && !userCrmId) {
      const teacher = {
        id: data.staff.id,
        name: data.staff.name,
        lessonDate: data.datetime,
      };

      const lead = {
        name: data.client.name || "Ім'я не вказано",
        phone: data.client.phone || "Номер телефону не вказано",
      };

      // Форматуємо повідомлення за допомогою Markdown
      const message = `❗❗ *Створено новий запис БЕЗ ID CRM!*  
            👨‍🏫 *Викладач:* ${teacher.name}  
            📅 *Дата уроку:* ${format(
              new Date(teacher.lessonDate),
              "d MMMM yyyy, HH:mm",
              { locale: uk }
            )}  
            👤 *Клієнт:* ${lead.name}  
            📞 *Телефон:* \`${lead.phone}\``;
      sendMessageToChat(message); //
      return res.status(200).json({ message: "User without ID" });
    }

    if (!userCrmId) {
      return res.status(200).json({ message: "CRM ID not found" });
    }

    // Логіка обробки запису
    if (
      resource === "record" &&
      (status === "create" || status === "update") &&
      userCrmId &&
      isSalesServices
    ) {
      const lead = await getCRMLead(userCrmId);
      const teacher = {
        id: data.staff.id,
        name: data.staff.name,
        lessonDate: data.datetime,
        lessonFormat: data.services.some((service) =>
          C2UTrialId.includes(service.id)
        )
          ? "Індивідуальне C2U пробне"
          : "Індивідуальне",
      };

      if (Pipeline.sales === lead.pipeline_id && visit_attendance === 0) {
        bookTestLesson(
          userCrmId,
          Pipeline.sales,
          Status.salesPiplineBookTestLessonInd,
          teacher
        );
      }

      if (Pipeline.reanimation === lead.pipeline_id && visit_attendance === 0) {
        bookTestLesson(
          userCrmId,
          Pipeline.reanimation,
          Status.reanimationPiplineBookTestLessonInd,
          teacher
        );
      }

      if (Pipeline.sales === lead.pipeline_id && visit_attendance === 1) {
        bookTestLesson(
          userCrmId,
          Pipeline.sales,
          Status.salesWasBookTestLessonInd
        );
      }

      if (Pipeline.reanimation === lead.pipeline_id && visit_attendance === 1) {
        bookTestLesson(
          userCrmId,
          Pipeline.reanimation,
          Status.reanimationWasBookTestLessonInd
        );
      }

      if (Pipeline.sales === lead.pipeline_id && visit_attendance < 0) {
        bookTestLesson(
          userCrmId,
          Pipeline.sales,
          Status.salesNotWasBookTestLessonInd
        );
      }

      if (Pipeline.reanimation === lead.pipeline_id && visit_attendance < 0) {
        bookTestLesson(
          userCrmId,
          Pipeline.reanimation,
          Status.reanimationNotWasBookTestLessonInd
        );
      }
    }

    if (
      resource === "record" &&
      (status === "create" || status === "update") &&
      userCrmId &&
      isLevelDefinition
    ) {
      const lead = await getCRMLead(userCrmId);
      const lessonData = getLinkMapTrialByValue(data.services[0].id);
      const teacher = {
        id: data.staff.id,
        name: data.staff.name,
        lessonDate: getLessonDate(data.datetime, data.services[0].id),
        lessonFormat: lessonData.CRMslug,
      };

      if (Pipeline.sales === lead.pipeline_id && visit_attendance === 0) {
        bookTestLesson(
          userCrmId,
          Pipeline.sales,
          getNewStatus(data.services[0].id, StatusMappingSales),
          teacher
        );
      }

      if (Pipeline.reanimation === lead.pipeline_id && visit_attendance === 0) {
        bookTestLesson(
          userCrmId,
          Pipeline.reanimation,
          getNewStatus(data.services[0].id, StatusMappingReanimation),
          teacher
        );
      }
    }

    if (
      (status === "update" || status === "create") &&
      resource === "record" &&
      isIndividualLesson
    ) {
      try {
        console.log("Preparing lesson room for individual lesson...");
        console.log(req)
        const { roomLink, teacher } = await prepareLessonRoom(data.staff_id);

        const appointment = {
          id: data.id,
          staff_id: data.staff_id,
          services: data.services,
          datetime: data.date,
          seance_length: data.seance_length,
          client: data.client,
        };

        bookIndividualLesson(appointment, roomLink, teacher);

        return res.status(200).json({
          message: "Individual lesson booked successfully",
        });
      } catch (error) {
        console.error("Error preparing lesson room:", error);
        return res.status(500).json({
          message: "Error preparing lesson room",
          status: "badRequest",
        });
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

async function bookIndividualLesson(appointment, roomLink, teacher) {
  try {
    // console.log(appointment);

    await axios.put(
      `https://api.alteg.io/api/v1/record/${process.env.ALTEGIO_COMPANY_ID}/${appointment.id}`,
      {
        ...appointment,
        comment: `Посилання на урок: ${roomLink}

Логін і пароль на платформу:
  Логін: ${teacher.login}
  Пароль: ${teacher.password}

Логін і пароль організатора відеочату:
  Логін: ${process.env.HOST_USERNAME}
  Пароль: ${process.env.HOST_PASSWORD}
`,
      },
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
  }
}

async function bookTestLesson(leadId, pipelineId, status, teacher = null) {
  const postRequest = {
    status_id: status,
    pipeline_id: pipelineId,
  };

  if (teacher) {
    postRequest.custom_fields_values = [
      {
        field_id: 1821801,
        field_name: "Куди і на котру записаний на пробне",
        values: [
          {
            value: teacher.lessonFormat,
          },
        ],
      },
      {
        field_id: 1806904,
        field_name: "Дата і час запису на пробне заняття",
        values: [
          {
            value: teacher.lessonDate,
          },
        ],
      },
      {
        field_id: 1807140,
        field_name: "Викладач на пробному",
        values: [
          {
            value: teacher.name,
          },
        ],
      },
    ];
  }
  // console.log('=====================');
  // console.log('teacher', teacher);
  // console.log('teacher.lessonFormat', teacher?.lessonFormat);
  // console.log(PersonalLinkMapTrial.find(link => link.teacherId === teacher.id)?.link || '',)
  // console.log('=====================');
  if (
    teacher?.lessonFormat &&
    teacher.lessonFormat === "Індивідуальне C2U пробне"
  ) {
    postRequest.custom_fields_values.push({
      field_id: 1826019,
      field_name: "Посилання на пробний урок",
      values: [
        {
          value:
            PersonalLinkMapTrial.find((link) => link.teacherId === teacher.id)
              ?.link || "",
        },
      ],
    });
  }

  try {
    const currentToken = await getToken();

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${currentToken[0].access_token}`;

    const crmLead = await axios
      .patch(
        `https://apeducation.kommo.com/api/v4/leads/${leadId}`,
        postRequest
      )
      .catch((err) => {
        console.log(JSON.stringify(err.response.data));
        return null;
      });
    return crmLead;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function getLinkMapTrialByValue(value) {
  const levelKey = Object.keys(LevelDefinition).find(
    (key) => LevelDefinition[key] === value
  );
  if (!levelKey) {
    return null;
  }
  const levelParts = levelKey.split("_");
  const language = levelParts[0];
  const group = levelParts[1];
  const time = levelParts[2];

  if (
    LinkMapTrial[language] &&
    LinkMapTrial[language][group] &&
    LinkMapTrial[language][group][time]
  ) {
    return LinkMapTrial[language][group][time];
  } else {
    return null;
  }
}

function getLessonDate(datetime, levelValue) {
  const levelKey = Object.keys(LevelDefinition).find(
    (key) => LevelDefinition[key] === levelValue
  );
  if (!levelKey) {
    return null;
  }

  const levelParts = levelKey.split("_");
  const hour = parseInt(levelParts[2], 10);

  const date = parseISO(datetime);
  const lessonDate = setHours(setMinutes(setSeconds(date, 0), 0), hour);
  return format(lessonDate, "yyyy-MM-dd'T'HH:mm:ssXXX");
}

function getNewStatus(levelValue, StatusMapping) {
  const levelKey = Object.keys(LevelDefinition).find(
    (key) => LevelDefinition[key] === levelValue
  );
  if (!levelKey) {
    return null;
  }

  const language = levelKey.split("_")[0];
  return StatusMapping[language] || null;
}

module.exports = {
  altegioWebhook,
  LinkMapTrial,
};
