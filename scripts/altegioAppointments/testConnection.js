#!/usr/bin/env node

/* eslint-disable camelcase */
/**
 * Швидкий тест підключення до Altegio API
 */

const { altegioGet } = require('../../services/altegio/altegioAuth');
require('dotenv').config();

async function testConnection() {
  console.log("🔧 Тестування підключення до Altegio API...\n");
  
  // Перевіряємо змінні оточення
  console.log("1️⃣ Перевірка змінних оточення:");
  
  const requiredVars = ['ALTEGIO_COMPANY_ID', 'ALTEGIO_COMPANY_TOKEN', 'ALTEGIO_USER_TOKEN'];
  const missingVars = [];
  
  requiredVars.forEach(varName => {
    if (process.env[varName]) {
      console.log(`  ✅ ${varName}: встановлено`);
    } else {
      console.log(`  ❌ ${varName}: відсутня`);
      missingVars.push(varName);
    }
  });
  
  if (missingVars.length > 0) {
    console.log(`\n❌ Відсутні обов'язкові змінні: ${missingVars.join(', ')}`);
    console.log("Встановіть їх у файлі .env або в системі");
    process.exit(1);
  }
  
  console.log("\n2️⃣ Тестування API запиту:");
  
  try {
    // Робимо тестовий запит - тільки 1 запис за сьогодні
    const today = new Date().toISOString().split('T')[0];
    
    console.log(`  📅 Запитуємо appointments за ${today}...`);
    
    const response = await altegioGet(
      `https://api.alteg.io/api/v1/records/${process.env.ALTEGIO_COMPANY_ID}`,
      {
        params: {
          page: 1,
          count: 1,
          start_date: today,
          end_date: today,
        },
      }
    );
    
    console.log("  ✅ API запит успішний!");
    console.log(`  📊 Статус відповіді: ${response.status}`);
    console.log(`  📦 Кількість записів: ${response.data.data?.length || 0}`);
    
    if (response.data.data && response.data.data.length > 0) {
      const appointment = response.data.data[0];
      console.log(`  📋 Приклад запису: ID ${appointment.id}, клієнт: ${appointment.client?.name || 'N/A'}`);
    }
    
  } catch (error) {
    console.log("  ❌ Помилка API запиту:");
    
    if (error.response) {
      console.log(`    Статус: ${error.response.status}`);
      console.log(`    Повідомлення: ${error.response.data?.message || error.response.statusText}`);
      
      if (error.response.status === 401) {
        console.log("    💡 Можливо неправильні токени авторизації");
      } else if (error.response.status === 404) {
        console.log("    💡 Можливо неправильний company_id");
      } else if (error.response.status === 429) {
        console.log("    💡 Перевищено ліміт запитів - спробуйте пізніше");
      }
    } else {
      console.log(`    ${error.message}`);
    }
    
    process.exit(1);
  }
  
  console.log("\n3️⃣ Тестування підключення до бази даних:");
  
  try {
    require("../../db/connection");
    const AltegioAppointments = require("../../db/models/altegioAppointments");
    
    console.log("  ✅ Підключення до БД встановлено");
    
    const count = await AltegioAppointments.countDocuments();
    console.log(`  📊 Поточна кількість appointments в БД: ${count}`);
    
  } catch (error) {
    console.log("  ❌ Помилка підключення до БД:");
    console.log(`    ${error.message}`);
    console.log("    💡 Переконайтесь що MongoDB запущена та DB_URI правильна");
    process.exit(1);
  }
  
  console.log("\n🎉 ВСІ ТЕСТИ ПРОЙШЛИ УСПІШНО!");
  console.log("✅ Можете запускати синхронізацію appointments");
  console.log("\nПриклади команд:");
  console.log("  npm run sync-appointments today");
  console.log("  npm run sync-appointments yesterday");
  console.log("  npm run appointments-stats");
  
  process.exit(0);
}

// Обробка помилок
process.on('unhandledRejection', (error) => {
  console.error("\n❌ Непередбачена помилка:");
  console.error(error.message);
  process.exit(1);
});

// Запуск тесту
testConnection();
