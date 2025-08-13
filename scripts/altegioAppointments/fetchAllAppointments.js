/* eslint-disable camelcase */
const { DateTime } = require("luxon");
const AltegioAppointments = require("../../db/models/altegioAppointments");
const { altegioGet } = require("../../services/altegio/altegioAuth");
require("dotenv").config();

// Rate limiting - максимум 4 запити за секунду
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const RATE_LIMIT_DELAY = 2000; // 2s

// Список сервісів для індивідуальних уроків
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

// Список сервісів для sales/trial уроків
const SalesServicesIdList = [
  10669989, 10669992, 10669994, 12452584, 12452585, 12460475, 12035570,
  11004387,
];

// Список сервісів для визначення рівня (Level Definition)
const LevelDefinitionIdList = [
  12500073, 12318088, 12287043, 12287042, 12186844, 12186843, 12186842,
  12186841, 12186840, 12186839, 12186838, 12186837,
];

// C2U Trial сервіси
const C2UTrialId = [12460475];

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

async function fetchAppointmentsPage(page, count, startDate, endDate) {
  try {
    const response = await altegioGet(
      `https://api.alteg.io/api/v1/records/${process.env.ALTEGIO_COMPANY_ID}`,
      {
        params: {
          page,
          count,
          start_date: startDate,
          end_date: endDate,
          with_deleted: 1, // включаємо видалені записи
        },
        includeUserId: true // автоматично додасть user_id до параметрів
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error.response?.data || error.message);
    throw error;
  }
}

async function processAppointment(appointment) {
  try {
    // Перевіряємо чи це індивідуальний урок
    const isIndividualLesson = appointment.services?.some((service) =>
      IndividualServicesList.includes(service.id)
    );

    if (!isIndividualLesson) {
      return null; // Пропускаємо якщо не індивідуальний урок
    }

    // Парсимо ім'я клієнта для отримання leadId та leadName
    const { leadId, leadName } = parseUserName(appointment.client?.name || "");

    // Якщо немає leadId - пропускаємо запис
    if (!leadId || !leadName) {
      console.log(`Skipping appointment ${appointment.id} - no valid leadId or leadName`);
      return null;
    }

    // Перевіряємо чи існує вже такий запис в БД з таймаутом
    let existingAppointment;
    try {
      existingAppointment = await AltegioAppointments.findOne({
        appointmentId: appointment.id.toString()
      }).maxTimeMS(8000); // Максимум 8 секунд на запит
    } catch (dbError) {
      console.error(`Database timeout for appointment ${appointment.id}:`, dbError.message);
      // У випадку таймауту, продовжуємо без перевірки дублікатів
      console.log(`Continuing without duplicate check for appointment ${appointment.id}`);
      existingAppointment = null;
    }

    if (existingAppointment) {
      console.log(`Appointment ${appointment.id} already exists in database`);
      return null;
    }

    // Формуємо дати
    const date = new Date(appointment.datetime);
    const startDateTime = DateTime.fromJSDate(date, {
      zone: "Europe/Kiev",
    }).toISO();
    const endDateTime = DateTime.fromJSDate(
      new Date(date.getTime() + appointment.seance_length * 1000),
      {
        zone: "Europe/Kiev",
      }
    ).toISO();

    // Визначаємо чи це trial урок за ID сервісу
    // SalesServicesIdList - загальні sales/trial уроки
    // LevelDefinitionIdList - уроки для визначення рівня (також trial)
    // C2UTrialId - спеціальні C2U пробні уроки
    const isTrialLesson = appointment.services?.some((service) => 
      SalesServicesIdList.includes(service.id) || 
      LevelDefinitionIdList.includes(service.id) ||
      C2UTrialId.includes(service.id)
    );

    // Створюємо новий запис
    const newAppointmentData = {
      appointmentId: appointment.id.toString(),
      leadId,
      leadName,
      teacherId: appointment.staff?.id?.toString() || "",
      teacherName: appointment.staff?.name || "",
      serviceId: appointment.services?.[0]?.id?.toString() || "",
      serviceName: appointment.services?.[0]?.title || "",
      startDateTime,
      endDateTime,
      status: appointment.visit_attendance?.toString() || "0",
      IsTrial: isTrialLesson,
      isDeleted: appointment.deleted === 1,
    };

    // Зберігаємо новий запис з обробкою помилок
    let savedAppointment;
    try {
      savedAppointment = await AltegioAppointments(newAppointmentData).save();
      console.log(`Saved appointment ${appointment.id} for ${leadName} (Trial: ${isTrialLesson ? 'Yes' : 'No'})`);
    } catch (saveError) {
      console.error(`Error saving appointment ${appointment.id}:`, saveError.message);
      // Якщо помилка через дублікат (E11000), це нормально
      if (saveError.code === 11000) {
        console.log(`Appointment ${appointment.id} already exists (duplicate key)`);
        return null;
      }
      throw saveError; // Перекидаємо інші помилки
    }
    
    return savedAppointment;
  } catch (error) {
    console.error(`Error processing appointment ${appointment.id}:`, error.message);
    return null;
  }
}

async function fetchAllAppointments(startDate, endDate) {
  console.log(`Starting to fetch appointments from ${startDate} to ${endDate}`);
  
  let page = 1;
  let totalProcessed = 0;
  let totalSaved = 0;
  const count = 50; // максимум записів на сторінку
  
  try {
    while (true) {
      console.log(`Fetching page ${page}...`);
      
      // Робимо запит до API
      const result = await fetchAppointmentsPage(page, count, startDate, endDate);
      
      if (!result.success || !result.data || result.data.length === 0) {
        console.log("No more appointments found");
        break;
      }

      console.log(`Processing ${result.data.length} appointments from page ${page}`);
      
      // Обробляємо кожен appointment з невеликою паузою між записами
      for (let i = 0; i < result.data.length; i++) {
        const appointment = result.data[i];
        const saved = await processAppointment(appointment);
        totalProcessed++;
        if (saved) {
          totalSaved++;
        }
        
        // Невелика пауза кожні 10 записів для зменшення навантаження на БД
        if ((i + 1) % 10 === 0) {
          await delay(100); // 100ms пауза кожні 10 записів
        }
      }

      // Якщо кількість отриманих записів менша за count, значить це остання сторінка
      if (result.data.length < count) {
        console.log("Reached last page");
        break;
      }

      page++;
      
      // Rate limiting - чекаємо перед наступним запитом
      await delay(RATE_LIMIT_DELAY);
    }
  } catch (error) {
    console.error("Error in fetchAllAppointments:", error.message);
    throw error;
  }

  console.log(`\nProcessing completed:`);
  console.log(`Total appointments processed: ${totalProcessed}`);
  console.log(`Total appointments saved: ${totalSaved}`);
  console.log(`Appointments skipped: ${totalProcessed - totalSaved}`);
  
  return { totalProcessed, totalSaved };
}

// Функція для запуску скрипта з аргументами командного рядка
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log("Usage: node fetchAllAppointments.js <start_date> <end_date>");
    console.log("Date format: YYYY-MM-DD");
    console.log("Example: node fetchAllAppointments.js 2025-01-01 2025-01-31");
    process.exit(1);
  }

  const startDate = args[0];
  const endDate = args[1];

  // Валідація дат
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  
  if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
    console.error("Invalid date format. Use YYYY-MM-DD");
    process.exit(1);
  }

  if (startDateObj > endDateObj) {
    console.error("Start date cannot be after end date");
    process.exit(1);
  }

  try {
    // Підключаємось до БД
    const mongoose = require("mongoose");
    const connectDB = require("../../db/connection");
    
    console.log("Connecting to database...");
    await connectDB();
    
    console.log("Connected to database");
    console.log(`Database state: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Not connected'}`);
    console.log(`Fetching appointments from ${startDate} to ${endDate}`);
    
    await fetchAllAppointments(startDate, endDate);
    
    console.log("Script completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Script failed:", error.message);
    process.exit(1);
  }
}

// Запускаємо скрипт якщо він викликається напряму
if (require.main === module) {
  main();
}

module.exports = {
  fetchAllAppointments,
  processAppointment,
  fetchAppointmentsPage,
};
