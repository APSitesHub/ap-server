#!/usr/bin/env node

/* eslint-disable camelcase */
const { fetchAllAppointments } = require('./fetchAllAppointments');
require("dotenv").config();

// Допоміжні функції для роботи з датами
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function getDateRange(option) {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  switch (option) {
    case 'today': {
      return {
        start: formatDate(startOfToday),
        end: formatDate(startOfToday)
      };
    }
    
    case 'yesterday': {
      const yesterday = new Date(startOfToday);
      yesterday.setDate(yesterday.getDate() - 1);
      return {
        start: formatDate(yesterday),
        end: formatDate(yesterday)
      };
    }
    
    case 'this-week': {
      const startOfWeek = new Date(startOfToday);
      startOfWeek.setDate(startOfToday.getDate() - startOfToday.getDay() + 1); // Понеділок
      return {
        start: formatDate(startOfWeek),
        end: formatDate(startOfToday)
      };
    }
    
    case 'last-week': {
      const lastWeekEnd = new Date(startOfToday);
      lastWeekEnd.setDate(startOfToday.getDate() - startOfToday.getDay());
      const lastWeekStart = new Date(lastWeekEnd);
      lastWeekStart.setDate(lastWeekEnd.getDate() - 6);
      return {
        start: formatDate(lastWeekStart),
        end: formatDate(lastWeekEnd)
      };
    }
    
    case 'this-month': {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      return {
        start: formatDate(startOfMonth),
        end: formatDate(startOfToday)
      };
    }
    
    case 'last-month': {
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
      return {
        start: formatDate(lastMonthStart),
        end: formatDate(lastMonthEnd)
      };
    }
    
    default:
      return null;
  }
}

function showHelp() {
  console.log(`
Altegio Appointments Fetcher

Usage:
  node syncAppointments.js <option>

Options:
  today           - Fetch appointments for today
  yesterday       - Fetch appointments for yesterday
  this-week       - Fetch appointments for current week (Monday to today)
  last-week       - Fetch appointments for last week (Monday to Sunday)
  this-month      - Fetch appointments for current month
  last-month      - Fetch appointments for last month
  <start> <end>   - Fetch appointments for custom date range (YYYY-MM-DD format)

Examples:
  node syncAppointments.js today
  node syncAppointments.js last-week
  node syncAppointments.js 2025-01-01 2025-01-31

Environment variables required:
  ALTEGIO_COMPANY_ID
  ALTEGIO_COMPANY_TOKEN
  ALTEGIO_USER_TOKEN
`);
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    showHelp();
    process.exit(0);
  }

  let startDate, endDate;

  if (args.length === 1) {
    // Використовуємо предефіновані опції
    const dateRange = getDateRange(args[0]);
    if (!dateRange) {
      console.error(`Unknown option: ${args[0]}`);
      showHelp();
      process.exit(1);
    }
    startDate = dateRange.start;
    endDate = dateRange.end;
  } else if (args.length === 2) {
    // Використовуємо кастомний діапазон дат
    startDate = args[0];
    endDate = args[1];
    
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
  } else {
    console.error("Invalid number of arguments");
    showHelp();
    process.exit(1);
  }

  // Перевіряємо наявність необхідних змінних оточення
  if (!process.env.ALTEGIO_COMPANY_ID || !process.env.ALTEGIO_COMPANY_TOKEN || !process.env.ALTEGIO_USER_TOKEN) {
    console.error("Missing required environment variables:");
    console.error("ALTEGIO_COMPANY_ID, ALTEGIO_COMPANY_TOKEN, ALTEGIO_USER_TOKEN");
    process.exit(1);
  }

  try {
    // Підключаємось до БД
    require("../../db/connection");
    
    console.log("Connected to database");
    console.log(`Fetching appointments from ${startDate} to ${endDate}`);
    
    const result = await fetchAllAppointments(startDate, endDate);
    
    console.log("\n=== SUMMARY ===");
    console.log(`Date range: ${startDate} to ${endDate}`);
    console.log(`Total appointments processed: ${result.totalProcessed}`);
    console.log(`Total appointments saved: ${result.totalSaved}`);
    console.log(`Appointments skipped: ${result.totalProcessed - result.totalSaved}`);
    console.log("Script completed successfully");
    
    process.exit(0);
  } catch (error) {
    console.error("Script failed:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Запускаємо скрипт
main();
