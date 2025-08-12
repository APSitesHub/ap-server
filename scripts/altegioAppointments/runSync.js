#!/usr/bin/env node

/* eslint-disable camelcase */
/**
 * Скрипт для одноразової синхронізації appointments з Altegio
 * Можна запускати з параметрами дат або без них (буде запитувати інтерактивно)
 */

const readline = require('readline');
const { fetchAllAppointments } = require('./fetchAllAppointments');
require("dotenv").config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function isValidDate(dateString) {
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}$/.test(dateString);
}

async function getDateInput() {
  console.log('\n=== Altegio Appointments Sync ===\n');
  
  let startDate, endDate;
  
  while (!startDate || !isValidDate(startDate)) {
    startDate = await question('Введіть дату початку (YYYY-MM-DD): ');
    if (!isValidDate(startDate)) {
      console.log('❌ Неправильний формат дати. Використовуйте YYYY-MM-DD');
    }
  }
  
  while (!endDate || !isValidDate(endDate)) {
    endDate = await question('Введіть дату кінця (YYYY-MM-DD): ');
    if (!isValidDate(endDate)) {
      console.log('❌ Неправильний формат дати. Використовуйте YYYY-MM-DD');
    }
  }
  
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  
  if (startDateObj > endDateObj) {
    console.log('❌ Дата початку не може бути пізніше дати кінця');
    return await getDateInput();
  }
  
  // Розрахунок кількості днів
  const daysDiff = Math.ceil((endDateObj - startDateObj) / (1000 * 60 * 60 * 24)) + 1;
  
  console.log(`\n📅 Період: ${startDate} - ${endDate} (${daysDiff} днів)`);
  
  const confirm = await question('Продовжити? (y/n): ');
  if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 'yes') {
    console.log('Операція скасована');
    process.exit(0);
  }
  
  return { startDate, endDate };
}

async function main() {
  try {
    // Перевірка змінних оточення
    if (!process.env.ALTEGIO_COMPANY_ID || !process.env.ALTEGIO_COMPANY_TOKEN || !process.env.ALTEGIO_USER_TOKEN) {
      console.error('❌ Відсутні необхідні змінні оточення:');
      console.error('ALTEGIO_COMPANY_ID, ALTEGIO_COMPANY_TOKEN, ALTEGIO_USER_TOKEN');
      process.exit(1);
    }

    let startDate, endDate;
    
    // Якщо передані аргументи командного рядка
    const args = process.argv.slice(2);
    if (args.length === 2) {
      [startDate, endDate] = args;
      
      if (!isValidDate(startDate) || !isValidDate(endDate)) {
        console.error('❌ Неправильний формат дати. Використовуйте YYYY-MM-DD');
        process.exit(1);
      }
      
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      
      if (startDateObj > endDateObj) {
        console.error('❌ Дата початку не може бути пізніше дати кінця');
        process.exit(1);
      }
    } else if (args.length === 0) {
      // Інтерактивний ввід
      const dateInput = await getDateInput();
      startDate = dateInput.startDate;
      endDate = dateInput.endDate;
    } else {
      console.log('Usage: node runSync.js [start_date] [end_date]');
      console.log('Date format: YYYY-MM-DD');
      console.log('Example: node runSync.js 2025-01-01 2025-01-31');
      console.log('Or run without arguments for interactive mode');
      process.exit(1);
    }

    rl.close();

    // Підключення до БД
    console.log('🔌 Підключення до бази даних...');
    require("../../db/connection");
    console.log('✅ Підключено до бази даних');
    
    console.log(`\n🚀 Початок синхронізації appointments з ${startDate} до ${endDate}`);
    console.log('⏳ Це може зайняти деякий час залежно від кількості записів...\n');
    
    const startTime = Date.now();
    const result = await fetchAllAppointments(startDate, endDate);
    const endTime = Date.now();
    
    const duration = Math.round((endTime - startTime) / 1000);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    
    console.log('\n🎉 СИНХРОНІЗАЦІЯ ЗАВЕРШЕНА!');
    console.log('='.repeat(50));
    console.log(`📅 Період: ${startDate} - ${endDate}`);
    console.log(`📊 Оброблено записів: ${result.totalProcessed}`);
    console.log(`💾 Збережено нових: ${result.totalSaved}`);
    console.log(`⏭️  Пропущено дублів: ${result.totalProcessed - result.totalSaved}`);
    console.log(`⏱️  Час виконання: ${minutes}хв ${seconds}с`);
    console.log('='.repeat(50));
    
    if (result.totalSaved === 0 && result.totalProcessed > 0) {
      console.log('ℹ️  Всі записи вже існували в базі даних');
    } else if (result.totalSaved > 0) {
      console.log(`✅ Успішно додано ${result.totalSaved} нових записів`);
    }
    
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Помилка під час синхронізації:');
    console.error(error.message);
    if (process.env.NODE_ENV === 'development') {
      console.error('\nСтек помилки:');
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Обробка сигналів для коректного завершення
process.on('SIGINT', () => {
  console.log('\n\n⏹️  Операція перервана користувачем');
  rl.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\n⏹️  Операція завершена');
  rl.close();
  process.exit(0);
});

// Запуск
main();
