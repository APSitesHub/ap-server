const express = require("express");
const updateUserWithWebhook = require("../controllers/webhook/updateUserWithWebhook");
const getPlatformNumberAndPupilId = require("../middlewares/platform/getPlatformNumberAndPupilId");
const getResponsibleUser = require("../middlewares/crm/getResponsibleUser");
const getLeadsForGoogleSheets = require("../middlewares/crm/getLeadsCRM");
const updateLeadPaidStatus = require("../middlewares/crm/updatePaidLeadStatus");
const { getToken } = require("../services/tokensServices");
const axios = require("axios");

const AltegioLanguageCategories = {
  ENG: 12291759,
  DE: 12292979,
  PL: 12292266,
};

// const Services = {
//   ENG: {
//     day: {
//       ['Індивідуальне заняття']:
//     },
//     evening: {},
//   },
// };
//

const ServicesMap = {
  ENG: {
    N: {
      "Групове заняття": 12392201,
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
  },
  // POL: {
  //   J: {
  //     "Індивідуальне заняття": 301,
  //     "Групове заняття": 302,
  //     "Парне заняття": 303,
  //   },
  // },
};

const router = express.Router();

router.post(
  "/kommo",
  getPlatformNumberAndPupilId,
  getResponsibleUser,
  updateUserWithWebhook,
);

router.post("/google_kommo", getLeadsForGoogleSheets, updateLeadPaidStatus);

router.post("/found_teacher", async (req, res) => {
  const RESPONSIBLE_MANGER_ID = 557260;
  const DATE_TIME_LESSON = 1824843;
  const LESSON_TYPE = 1824839;
  const LESSON_LEVEL = 1824721;
  const LESSON_LANGUAGE = 1824775;
  const TEACHER = 1824847;
  const FOR_CHILDREN = 1824855;

  const leadId = req.body.leads.add[0].id;
  if (!leadId) {
    return res.status(404).json({ message: `Lead ID not found` });
  }

  try {
    const currentToken = await getToken();
    console.log(currentToken);
    axios.defaults.headers.common["Authorization"] =
      `Bearer ${currentToken[0].access_token}`;

    const crmLead = await axios.get(
      `https://apeducation.kommo.com/api/v4/leads/${req.body.leads.add[0].id}`,
    );
    console.log(crmLead.data);
    const customFields = crmLead.data.custom_fields_values;
    if (!Array.isArray(customFields) || !customFields.length) {
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
        case DATE_TIME_LESSON:
          userInfoForLesson = {
            ...userInfoForLesson,
            dateTimeLesson: convertToISODate(filed.values[0].value),
          };
          break;
        case LESSON_TYPE:
          userInfoForLesson = {
            ...userInfoForLesson,
            lessonType: filed.values[0].value,
          };
          break;
        case LESSON_LEVEL:
          userInfoForLesson = {
            ...userInfoForLesson,
            lessonLevel: filed.values[0].value,
          };
          break;
        case LESSON_LANGUAGE:
          userInfoForLesson = {
            ...userInfoForLesson,
            lesson_language: filed.values[0].value,
          };
          break;
        case TEACHER:
          userInfoForLesson = {
            ...userInfoForLesson,
            teacherLvl: filed.values[0].value,
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

    const serviceIds =
      ServicesMap?.[userInfoForLesson.lesson_language]?.[
        userInfoForLesson.teacherLvl
      ]?.[userInfoForLesson.lessonType];

    const dateTime = userInfoForLesson.dateTimeLesson;
    const isChildren = Boolean(userInfoForLesson.isChildren);
    const bookableStaff = await getBookableStaff(
      serviceIds,
      dateTime,
      isChildren,
    );
    console.log(bookableStaff);
    const list = bookableStaff.map((employee) => employee.name).join(", ");
    const taskData = [
      {
        task_type_id: 1, // ID типу задачі (залежить від налаштувань у вашій CRM)
        text: `Доступні викладачі ${list}`, // Опис задачі
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
      },
    );
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Error with lead ${req.body.leads.add[0].id}` });
  }
  return res.status(200).json({ message: "OK" });
});

function convertToISODate(data) {
  const timestampInMillis = data * 1000;
  const date = new Date(timestampInMillis);

  // Конвертація до Київського часового поясу
  const options = {
    timeZone: "Europe/Kyiv",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat("en-CA", options); // en-CA форматує як YYYY-MM-DD
  const parts = formatter.formatToParts(date);

  // Формування рядка у форматі 'YYYY-MM-DDTHH:MM'
  const formattedDate = `${parts[0].value}-${parts[2].value}-${parts[4].value}T${parts[6].value}:${parts[8].value}`;
  return formattedDate;
}

async function getBookableStaff(serviceIds, dateTime, isChildren) {
  const companyId = process.env.ALTEGIO_COMPANY_ID;
  const companyToken = process.env.ALTEGIO_COMPANY_TOKEN;
  const firedStatus = "ЗВІЛЬНЕНО";
  const withoutChildrenStatus = "NO CHILDREN";
  try {
    const apiUrl = `https://api.alteg.io/api/v1/book_staff/${companyId}`;
    console.log(companyId);
    console.log(companyToken);
    console.log(apiUrl);
    console.log(serviceIds);
    console.log("DATE: ", dateTime);
    const response = await axios.get(apiUrl, {
      headers: {
        Accept: "application/vnd.api.v2+json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${companyToken}`,
      },
      params: {
        service_ids: serviceIds, // Фільтр по service ID
        datetime: dateTime, // Фільтр по даті
      },
    });

    // Перевірка статусу відповіді
    if (!response.data.success) {
      throw new Error("API call unsuccessful");
    }
    console.log("------------------");
    console.log(response.data.data);
    console.log("------------------");
    const bookableStaff = response.data.data.filter(
      (employee) =>
        employee.bookable && !`${employee.name}`.includes(firedStatus),
    );
    if (isChildren) {
      return bookableStaff.filter(
        (employee) => !`${employee.name}`.includes(withoutChildrenStatus),
      );
    }

    return bookableStaff;
  } catch (error) {
    console.error("Error fetching bookable staff:", error.message);
  }
}
module.exports = router;
