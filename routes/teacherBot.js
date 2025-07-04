const express = require("express");
const { getToken } = require("../services/tokensServices");
const axios = require("axios");
const { DateTime } = require("luxon");

const ServicesMap = {
  ENG: {
    N: {
      "Групове заняття": [12392201, 12291774],
      "Парне заняття": 12291770,
      "Індивідуальне заняття": 12291769,
      "Індивідуальне заняття 1.5 год": 12291776,
      "Індивідуальне заняття півгодини": 12291775,
    },
    J: {
      "Групове заняття": 12291782,
      "Парне заняття": 12291779,
      "Індивідуальне заняття": 12291778,
      "Індивідуальне заняття 1.5 год": 12291784,
      "Індивідуальне заняття півгодини": 12291783,
    },
    M: {
      "Групове заняття": 12291787,
      "Парне заняття": 12291786,
      "Індивідуальне заняття": 12291785,
      "Індивідуальне заняття 1.5 год": 12291790,
      "Індивідуальне заняття півгодини": 12291789,
    },
    S: {
      "Групове заняття": 12291795,
      "Парне заняття": 12291794,
      "Індивідуальне заняття": 12291793,
      "Індивідуальне заняття 1.5 год": 12291800,
      "Індивідуальне заняття півгодини": 12291799,
    },
  },
  PL: {
    N: {
      "Групове заняття": [12392237, 12292274],
      "Парне заняття": 12292273,
      "Індивідуальне заняття": 12292268,
      "Індивідуальне заняття 1.5 год": 12292280,
      "Індивідуальне заняття півгодини": 12292279,
    },
    J: {
      "Групове заняття": 12292287,
      "Парне заняття": 12292285,
      "Індивідуальне заняття": 12292284,
      "Індивідуальне заняття 1.5 год": 12292298,
      "Індивідуальне заняття півгодини": 12292296,
    },
    M: {
      "Групове заняття": 12292303,
      "Парне заняття": 12292301,
      "Індивідуальне заняття": 12292300,
      "Індивідуальне заняття 1.5 год": 12292309,
      "Індивідуальне заняття півгодини": 12292307,
    },
    S: {
      "Групове заняття": 12292340,
      "Парне заняття": 12292338,
      "Індивідуальне заняття": 12292337,
      "Індивідуальне заняття 1.5 год": 12292346,
      "Індивідуальне заняття півгодини": 12292344,
    },
  },
  DE: {
    N: {
      "Групове заняття": 12292982,
      "Парне заняття": 12292981,
      "Індивідуальне заняття": 12292980,
      "Індивідуальне заняття 1.5 год": 12292985,
      "Індивідуальне заняття півгодини": 12292983,
    },
    J: {
      "Групове заняття": 12292989,
      "Парне заняття": 12292988,
      "Індивідуальне заняття": 12292987,
      "Індивідуальне заняття 1.5 год": 12292993,
      "Індивідуальне заняття півгодини": 12292992,
    },
    M: {
      "Групове заняття": 12293000,
      "Парне заняття": 12292999,
      "Індивідуальне заняття": 12292994,
      "Індивідуальне заняття 1.5 год": 12293006,
      "Індивідуальне заняття півгодини": 12293004,
    },
    S: {
      "Групове заняття": 12293011,
      "Парне заняття": 12293010,
      "Індивідуальне заняття": 12293007,
      "Індивідуальне заняття 1.5 год": 12293015,
      "Індивідуальне заняття півгодини": 12293013,
    },
  },
};

const trialServicesMap = {
  ENG: 10669989,
  PL: 10669994,
  DE: 10669992,
};

const router = express.Router();
router.post("/found_teacher", async (req, res) => {
  const RESPONSIBLE_MANGER_ID = 557260;
  const DATE_TIME_LESSON_START = 1824843;
  // const DATE_TIME_LESSON_END = 1824931;
  // const LESSON_TYPE = 1824839;
  // const LESSON_LEVEL = 1824721;
  const LESSON_LANGUAGE = 1824775;
  // const TEACHER = 1824847;
  const FOR_CHILDREN = 1824855;
  let taskMsg = "";

  const leadId = req.body.leads.add[0].id;
  if (!leadId) {
    return res.status(404).json({ message: `Lead ID not found` });
  }

  try {
    const currentToken = await getToken();
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${currentToken[0].access_token}`;
    const crmLead = await axios.get(
      `https://apeducation.kommo.com/api/v4/leads/${req.body.leads.add[0].id}`
    );
    const customFields = crmLead.data.custom_fields_values;

    if (!Array.isArray(customFields) || !customFields.length) {
      console.error(`Lead do not have custom fields for found teacher`);
      return res
        .status(400)
        .json({ message: `Lead do not have custom fields` });
    }
    let userInfoForLesson = {
      responsibleUserId: crmLead.data.responsible_user_id,
    };
    customFields.forEach((filed) => {
      switch (filed.field_id) {
        case RESPONSIBLE_MANGER_ID:
          userInfoForLesson = {
            ...userInfoForLesson,
            responsibleManager: filed.values[0].value,
          };
          break;
        case DATE_TIME_LESSON_START:
          userInfoForLesson = {
            ...userInfoForLesson,
            dateTimeLessonStart: convertToISODate(filed.values[0].value),
          };
          break;
        case LESSON_LANGUAGE:
          userInfoForLesson = {
            ...userInfoForLesson,
            lesson_language: filed.values[0].value,
          };
          break;
        case FOR_CHILDREN:
          userInfoForLesson = {
            ...userInfoForLesson,
            isChildren: filed.values[0].value,
          };
          break;
      }
    });

    const dateTimeStart = userInfoForLesson.dateTimeLessonStart;
    const isChildren = Boolean(userInfoForLesson.isChildren);
    const serviceIds = trialServicesMap[userInfoForLesson.lesson_language];
    const bookableStaff = await getBookableStaff(serviceIds, isChildren);

    if (!dateTimeStart) {
      taskMsg = "Не вказано дату пошуку!";
      return;
    }

    if (!bookableStaff.length) {
      taskMsg = "Вільних викладачів не знайдено!";
      return;
    }

    const sessions = await getSessions(bookableStaff, dateTimeStart);

    const list = sessions
      .map(
        (employee) =>
          `${normalizeTeacherName(employee.name)} ${employee.freeSessions}`
      )
      .join("\n");

    if (!list.length) {
      taskMsg = "Вільних викладачів не знайдено!";
    } else {
      taskMsg = `Доступні викладачі:\n${list}`;
    }
    const taskData = [
      {
        responsible_user_id: userInfoForLesson.responsibleUserId,
        task_type_id: 1, // ID типу задачі (залежить від налаштувань у вашій CRM)
        text: taskMsg, // Опис задачі taskMsg
        complete_till: Math.floor(new Date().getTime() / 1000), // Час завершення у форматі Unix timestamp
        entity_id: crmLead.data.id, // ID сутності (наприклад, lead ID)
        entity_type: "leads", // Тип сутності ('leads', 'contacts', 'companies')
        request_id: "example", // Ідентифікатор запиту для ідентифікації дублікатів
      },
    ];
    await axios.post(
      "https://apeducation.kommo.com/api/v4/tasks",
      taskData, // Тіло запиту
      {
        headers: {
          "Content-Type": "application/json", // Заголовок для JSON-запиту
        },
      }
    );
  } catch (err) {
    console.error(
      `Error with lead ${req.body.leads.add[0].id} ERROR: ${JSON.stringify(
        err
      )}`
    );
  }
  return res.status(200).json({ message: "OK" });
});

function normalizeTeacherName(name) {
  const firstTwoWords = name.split(" ").slice(0, 2);
  const levels = name.match(/\b(DE|ENG|PL|A0|A1|A2|B1|B2|C1|C2)\b/g) || [];

  return [...firstTwoWords, ...levels].join(" ");
}

function convertToISODate(data) {
  const date = DateTime.fromMillis(+data * 1000, { zone: "Europe/Kiev" });
  const formattedDate = date.toFormat("yyyy-LL-dd'T'HH:mm");
  return formattedDate;
}

function getNearbyTimes(date, timesArray) {
  const SEARCH_HOURS_RANGE = 2;
  // Convert base date to Kyiv time
  const baseDateTime = DateTime.fromISO(date, { zone: "Europe/Kiev" });
  const baseTime = baseDateTime.toMillis();
  const twoHoursMs = SEARCH_HOURS_RANGE * 60 * 60 * 1000;

  const filteredTimes = timesArray
    .filter((slot) => {
      // Convert slot time to Kyiv time
      const slotDateTime = DateTime.fromISO(slot.datetime, {
        zone: "Europe/Kiev",
      });
      const slotTime = slotDateTime.toMillis();
      return Math.abs(slotTime - baseTime) <= twoHoursMs;
    })
    .map((slot) => {
      // Format time in Kyiv timezone
      const slotDateTime = DateTime.fromISO(slot.datetime, {
        zone: "Europe/Kiev",
      });
      return slotDateTime.toFormat("HH:mm");
    });
  console.log("Filtered times:", filteredTimes);

  return filteredTimes.length ? `(${filteredTimes.join(", ")})` : null;
}

async function getBookableStaff(serviceIds, isChildren) {
  const companyId = process.env.ALTEGIO_COMPANY_ID;
  const companyToken = process.env.ALTEGIO_COMPANY_TOKEN;
  const firedStatus = "ЗВІЛЬНЕНО";
  const withoutChildrenStatus = "NO CHILDREN";
  const webinarsOnlyStatus = "ВЕБІНАР";
  const paramsOptions = {
    service_ids: serviceIds,
  };

  try {
    const apiUrl = `https://api.alteg.io/api/v1/book_staff/${companyId}`;
    const response = await axios.get(apiUrl, {
      headers: {
        Accept: "application/vnd.api.v2+json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${companyToken}`,
      },
      params: paramsOptions,
    });

    if (!response.data.success) {
      throw new Error("API call unsuccessful");
    }
    const bookableStaff = response.data.data.filter((employee) => {
      const employeeName = employee.name.toUpperCase();
      return (
        Boolean(employee.bookable) &&
        !employeeName.includes(firedStatus.toUpperCase()) &&
        !employeeName.includes(webinarsOnlyStatus.toUpperCase())
      );
    });
    if (isChildren) {
      return bookableStaff.filter(
        (employee) => !`${employee.name}`.includes(withoutChildrenStatus)
      );
    }

    return bookableStaff;
  } catch (error) {
    console.error("Error fetching bookable staff:", error.message);
  }
}

async function getSessions(teachers, startDate) {
  try {
    const sessions = await Promise.all(
      teachers.map(async (teacher) => {
        try {
          const apiUrl = `https://api.alteg.io/api/v1/book_times/${process.env.ALTEGIO_COMPANY_ID}/${teacher.id}/${startDate}`;
          const response = await axios.get(apiUrl, {
            headers: {
              Accept: "application/vnd.api.v2+json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.ALTEGIO_COMPANY_TOKEN}`,
            },
          });

          const sessionsData = response?.data?.data;
          if (!Array.isArray(sessionsData)) return null;

          return {
            id: teacher.id,
            name: teacher.name,
            freeSessions: getNearbyTimes(startDate, sessionsData),
          };
        } catch (err) {
          console.warn(
            `Failed to fetch sessions for teacher ID ${teacher.id}:`,
            err.message
          );
          return null;
        }
      })
    );

    return sessions.filter((session) => session.freeSessions).filter(Boolean);
  } catch (e) {
    console.error("Critical error in getSessions:", e);
    return [];
  }
}

module.exports = router;
