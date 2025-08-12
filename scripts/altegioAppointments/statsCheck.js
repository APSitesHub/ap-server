#!/usr/bin/env node

/* eslint-disable camelcase */
/**
 * Скрипт для перевірки статистики appointments в базі даних
 */

const AltegioAppointments = require("../../db/models/altegioAppointments");
require("dotenv").config();

async function getAppointmentsStats() {
  try {
    // Підключення до БД
    require("../../db/connection");
    
    console.log("📊 Аналіз appointments в базі даних...\n");
    
    // Загальна кількість
    const totalCount = await AltegioAppointments.countDocuments();
    console.log(`📈 Загальна кількість appointments: ${totalCount}`);
    
    // Кількість видалених
    const deletedCount = await AltegioAppointments.countDocuments({ isDeleted: true });
    console.log(`🗑️  Видалених: ${deletedCount}`);
    
    // Кількість активних
    const activeCount = totalCount - deletedCount;
    console.log(`✅ Активних: ${activeCount}`);
    
    // Статистика по статусам
    console.log("\n📋 Розподіл по статусам відвідування:");
    const statusStats = await AltegioAppointments.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);
    
    const statusLabels = {
      '0': 'Pending (Очікується)',
      '1': 'Arrived (Прийшов)',
      '-1': 'No-show (Не з\'явився)',
      '2': 'Confirmed (Підтверджено)'
    };
    
    statusStats.forEach(stat => {
      const label = statusLabels[stat._id] || `Невідомий (${stat._id})`;
      console.log(`  ${label}: ${stat.count}`);
    });
    
    // Топ-5 вчителів
    console.log("\n👨‍🏫 Топ-5 вчителів по кількості appointments:");
    const teacherStats = await AltegioAppointments.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: {
            teacherId: "$teacherId",
            teacherName: "$teacherName"
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    teacherStats.forEach((teacher, index) => {
      console.log(`  ${index + 1}. ${teacher._id.teacherName}: ${teacher.count}`);
    });
    
    // Топ-5 сервісів
    console.log("\n🎓 Топ-5 сервісів:");
    const serviceStats = await AltegioAppointments.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: {
            serviceId: "$serviceId",
            serviceName: "$serviceName"
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    serviceStats.forEach((service, index) => {
      console.log(`  ${index + 1}. ${service._id.serviceName}: ${service.count}`);
    });
    
    // Статистика по датах
    console.log("\n📅 Статистика по періодам:");
    
    // Найстаріший та найновіший запис
    const dateRange = await AltegioAppointments.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: null,
          minDate: { $min: "$startDateTime" },
          maxDate: { $max: "$startDateTime" }
        }
      }
    ]);
    
    if (dateRange.length > 0) {
      const range = dateRange[0];
      console.log(`  Найстаріший урок: ${range.minDate.toISOString().split('T')[0]}`);
      console.log(`  Найновіший урок: ${range.maxDate.toISOString().split('T')[0]}`);
    }
    
    // Appointments за останні 30 днів
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentCount = await AltegioAppointments.countDocuments({
      isDeleted: false,
      startDateTime: { $gte: thirtyDaysAgo }
    });
    
    console.log(`  За останні 30 днів: ${recentCount}`);
    
    // Appointments на майбутнє
    const futureCount = await AltegioAppointments.countDocuments({
      isDeleted: false,
      startDateTime: { $gte: new Date() }
    });
    
    console.log(`  Майбутні уроки: ${futureCount}`);
    
    // Перевірка на дублікати
    console.log("\n🔍 Перевірка на дублікати:");
    const duplicates = await AltegioAppointments.aggregate([
      {
        $group: {
          _id: "$appointmentId",
          count: { $sum: 1 },
          docs: { $push: "$_id" }
        }
      },
      {
        $match: {
          count: { $gt: 1 }
        }
      }
    ]);
    
    if (duplicates.length > 0) {
      console.log(`  ⚠️  Знайдено ${duplicates.length} дублікатів по appointmentId`);
      duplicates.forEach(dup => {
        console.log(`    appointmentId ${dup._id}: ${dup.count} записів`);
      });
    } else {
      console.log("  ✅ Дублікатів не знайдено");
    }
    
    console.log("\n" + "=".repeat(50));
    console.log("📊 Аналіз завершено");
    
  } catch (error) {
    console.error("❌ Помилка при аналізі:", error.message);
    process.exit(1);
  }
}

// Функція для очистки дублікатів
async function removeDuplicates() {
  console.log("🧹 Початок очистки дублікатів...");
  
  const duplicates = await AltegioAppointments.aggregate([
    {
      $group: {
        _id: "$appointmentId",
        count: { $sum: 1 },
        docs: { $push: { id: "$_id", createdAt: "$createdAt" } }
      }
    },
    {
      $match: {
        count: { $gt: 1 }
      }
    }
  ]);
  
  let removedCount = 0;
  
  for (const duplicate of duplicates) {
    // Залишаємо найстаріший запис, видаляємо решту
    const sortedDocs = duplicate.docs.sort((a, b) => a.createdAt - b.createdAt);
    const toRemove = sortedDocs.slice(1); // Всі крім першого
    
    for (const doc of toRemove) {
      await AltegioAppointments.deleteOne({ _id: doc.id });
      removedCount++;
    }
  }
  
  console.log(`✅ Видалено ${removedCount} дублікатів`);
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Аналіз appointments в базі даних

Usage:
  node statsCheck.js              - Показати статистику
  node statsCheck.js --clean      - Видалити дублікати
  node statsCheck.js --help       - Показати цю допомогу

Examples:
  node statsCheck.js
  node statsCheck.js --clean
`);
    process.exit(0);
  }
  
  if (args.includes('--clean')) {
    require("../../db/connection");
    await removeDuplicates();
    process.exit(0);
  }
  
  await getAppointmentsStats();
  process.exit(0);
}

main();
