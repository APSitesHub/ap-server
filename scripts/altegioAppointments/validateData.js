#!/usr/bin/env node

/* eslint-disable camelcase */
/**
 * Скрипт для валідації та перевірки цілісності даних appointments
 */

const AltegioAppointments = require("../../db/models/altegioAppointments");
require("dotenv").config();

async function validateAppointments() {
  try {
    require("../../db/connection");
    
    console.log("🔍 Валідація appointments в базі даних...\n");
    
    let issuesFound = 0;
    
    // 1. Перевірка на відсутні обов'язкові поля
    console.log("1️⃣ Перевірка обов'язкових полів:");
    
    const requiredFields = [
      'appointmentId',
      'leadId', 
      'leadName',
      'teacherId',
      'teacherName',
      'serviceId',
      'serviceName',
      'startDateTime',
      'endDateTime',
      'status'
    ];
    
    for (const field of requiredFields) {
      const count = await AltegioAppointments.countDocuments({
        [field]: { $in: [null, undefined, ""] }
      });
      
      if (count > 0) {
        console.log(`  ❌ ${field}: ${count} записів з пустими значеннями`);
        issuesFound += count;
      } else {
        console.log(`  ✅ ${field}: всі записи заповнені`);
      }
    }
    
    // 2. Перевірка формату дат
    console.log("\n2️⃣ Перевірка дат:");
    
    const invalidDates = await AltegioAppointments.find({
      $or: [
        { startDateTime: { $type: "string" } },
        { endDateTime: { $type: "string" } },
        { startDateTime: { $gte: "$endDateTime" } }
      ]
    });
    
    if (invalidDates.length > 0) {
      console.log(`  ❌ Знайдено ${invalidDates.length} записів з некоректними датами`);
      issuesFound += invalidDates.length;
    } else {
      console.log("  ✅ Всі дати в правильному форматі");
    }
    
    // 3. Перевірка leadId формату
    console.log("\n3️⃣ Перевірка формату leadId:");
    
    const invalidLeadIds = await AltegioAppointments.find({
      leadId: { $not: /^\d+$/ }
    });
    
    if (invalidLeadIds.length > 0) {
      console.log(`  ❌ Знайдено ${invalidLeadIds.length} записів з некоректним leadId (не число)`);
      invalidLeadIds.forEach(record => {
        console.log(`    - appointmentId: ${record.appointmentId}, leadId: "${record.leadId}"`);
      });
      issuesFound += invalidLeadIds.length;
    } else {
      console.log("  ✅ Всі leadId в правильному форматі");
    }
    
    // 4. Перевірка статусів
    console.log("\n4️⃣ Перевірка статусів:");
    
    const validStatuses = ['0', '1', '-1', '2'];
    const invalidStatuses = await AltegioAppointments.find({
      status: { $nin: validStatuses }
    });
    
    if (invalidStatuses.length > 0) {
      console.log(`  ❌ Знайдено ${invalidStatuses.length} записів з некоректним статусом`);
      const uniqueStatuses = [...new Set(invalidStatuses.map(r => r.status))];
      console.log(`    Некоректні статуси: ${uniqueStatuses.join(', ')}`);
      issuesFound += invalidStatuses.length;
    } else {
      console.log("  ✅ Всі статуси в правильному форматі");
    }
    
    // 5. Перевірка на аномально довгі або короткі уроки
    console.log("\n5️⃣ Перевірка тривалості уроків:");
    
    const appointments = await AltegioAppointments.find({
      isDeleted: false
    }).select('appointmentId startDateTime endDateTime');
    
    let shortLessons = 0;
    let longLessons = 0;
    
    appointments.forEach(apt => {
      const duration = (apt.endDateTime - apt.startDateTime) / (1000 * 60); // в хвилинах
      
      if (duration < 30) {
        shortLessons++;
      } else if (duration > 120) {
        longLessons++;
      }
    });
    
    console.log(`  📊 Уроки коротше 30 хвилин: ${shortLessons}`);
    console.log(`  📊 Уроки довше 120 хвилин: ${longLessons}`);
    
    if (shortLessons > 0 || longLessons > 0) {
      console.log("  ⚠️  Знайдено уроки з нестандартною тривалістю");
    }
    
    // 6. Перевірка на майбутні уроки з завершеним статусом
    console.log("\n6️⃣ Перевірка логіки статусів:");
    
    const now = new Date();
    const futureCompletedLessons = await AltegioAppointments.find({
      startDateTime: { $gt: now },
      status: { $in: ['1', '-1'] }, // Arrived або No-show
      isDeleted: false
    });
    
    if (futureCompletedLessons.length > 0) {
      console.log(`  ❌ Знайдено ${futureCompletedLessons.length} майбутніх уроків зі статусом "завершено"`);
      issuesFound += futureCompletedLessons.length;
    } else {
      console.log("  ✅ Логіка статусів коректна");
    }
    
    // 7. Перевірка на дублікати по різних полях
    console.log("\n7️⃣ Додаткова перевірка дублікатів:");
    
    // Дублікати по (leadId + startDateTime + teacherId)
    const logicalDuplicates = await AltegioAppointments.aggregate([
      {
        $group: {
          _id: {
            leadId: "$leadId",
            startDateTime: "$startDateTime", 
            teacherId: "$teacherId"
          },
          count: { $sum: 1 },
          appointmentIds: { $push: "$appointmentId" }
        }
      },
      {
        $match: { count: { $gt: 1 } }
      }
    ]);
    
    if (logicalDuplicates.length > 0) {
      console.log(`  ❌ Знайдено ${logicalDuplicates.length} логічних дублікатів (той же учень, вчитель, час)`);
      logicalDuplicates.forEach(dup => {
        console.log(`    - LeadId: ${dup._id.leadId}, Час: ${dup._id.startDateTime}, appointmentIds: [${dup.appointmentIds.join(', ')}]`);
      });
      issuesFound += logicalDuplicates.length;
    } else {
      console.log("  ✅ Логічних дублікатів не знайдено");
    }
    
    // Підсумок
    console.log("\n" + "=".repeat(50));
    if (issuesFound === 0) {
      console.log("🎉 ВАЛІДАЦІЯ ПРОЙШЛА УСПІШНО!");
      console.log("✅ Всі дані в базі коректні");
    } else {
      console.log(`⚠️  ЗНАЙДЕНО ${issuesFound} ПРОБЛЕМ`);
      console.log("❗ Рекомендується виправити виявлені проблеми");
    }
    console.log("=".repeat(50));
    
  } catch (error) {
    console.error("❌ Помилка при валідації:", error.message);
    process.exit(1);
  }
}

async function fixIssues() {
  console.log("🔧 Початок автоматичного виправлення проблем...\n");
  
  let fixedCount = 0;
  
  try {
    require("../../db/connection");
    
    // 1. Виправлення пустих рядків на null
    console.log("1️⃣ Виправлення пустих рядків...");
    
    const result1 = await AltegioAppointments.updateMany(
      {
        $or: [
          { leadName: "" },
          { teacherName: "" },
          { serviceName: "" }
        ]
      },
      {
        $unset: {
          leadName: "",
          teacherName: "",
          serviceName: ""
        }
      }
    );
    
    console.log(`  ✅ Виправлено ${result1.modifiedCount} записів з пустими рядками`);
    fixedCount += result1.modifiedCount;
    
    // 2. Видалення записів з критичними помилками
    console.log("\n2️⃣ Видалення записів з критичними помилками...");
    
    const criticalErrors = await AltegioAppointments.deleteMany({
      $or: [
        { appointmentId: { $in: [null, undefined, ""] } },
        { leadId: { $in: [null, undefined, ""] } },
        { startDateTime: { $in: [null, undefined] } },
        { endDateTime: { $in: [null, undefined] } }
      ]
    });
    
    console.log(`  ✅ Видалено ${criticalErrors.deletedCount} записів з критичними помилками`);
    fixedCount += criticalErrors.deletedCount;
    
    console.log(`\n🎉 Автоматичне виправлення завершено!`);
    console.log(`📊 Загалом виправлено: ${fixedCount} записів`);
    
  } catch (error) {
    console.error("❌ Помилка при виправленні:", error.message);
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Валідація appointments в базі даних

Usage:
  node validateData.js              - Провести валідацію
  node validateData.js --fix        - Автоматично виправити проблеми
  node validateData.js --help       - Показати цю допомогу

Examples:
  node validateData.js
  node validateData.js --fix
`);
    process.exit(0);
  }
  
  if (args.includes('--fix')) {
    await fixIssues();
  } else {
    await validateAppointments();
  }
  
  process.exit(0);
}

main();
