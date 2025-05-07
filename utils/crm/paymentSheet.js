const { google } = require('googleapis');
const axios = require('axios');
const { getToken } = require("../../services/tokensServices");
const { toLocalTime } = require('../../utils/dateUtils');
const getCRMUser = require('../../services/crmGetUser');

// Конфігурація
const API_BASE_URL = 'https://apeducation.kommo.com/api/v4/leads'; // Ваш субдомен

const SPREADSHEET_ID = '1B_dVFWP_VSRJm79tcy1xExGN9plgZgQaYxy8i5LJYKw'; // ID вашої Google таблиці
const SHEET_NAME = 'Аркуш1'; // Назва листа (змініть, якщо потрібно)
const BATCH_SIZE = 50; // Кількість ID у пакеті
const DELAY_MS = 200; // Затримка між запитами (мс)

// ID кастомних полів
const NEXT_PAYMENT_AMOUNT_ID = 557258; // Сума наступної оплати
const NEXT_PAYMENT_DATE_ID = 557476;   // Дата наступної оплати
const PAYMENT_FIXATION_ID = 1824495;   // Фіксація оплат
const STUDY_FORMAT = 558384; // Формат навчання
const TYPE_SERVICE = 1812897; // Вид послуги
const PAYMENT_REMAINING = 1809505; // Кількість платежів, що залишилось
// Ініціалізація Google Sheets
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Основна функція для оновлення таблиці
async function updateTable() {
  console.log('Початок оновлення таблиці...');

  try {
    // Зчитування ID лідів із Google Sheet
    const range = `${SHEET_NAME}!A:A`; // ID у стовпці A
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range,
    });

    const leadIds = response.data.values
      .slice(1) // Пропускаємо заголовок
      .map(row => row[0])
      .filter(id => id && !isNaN(id)); // Фільтруємо пусті та нечислові значення

    console.log(`Знайдено ${leadIds.length} ID лідів`);

    // Додаємо заголовки, якщо їх немає
    const headerRange = `${SHEET_NAME}!B1:D1`;
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: headerRange,
    });

    if (!headerResponse.data.values || headerResponse.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: headerRange,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [['Сума наступної оплати', 'Дата наступної оплати', 'Фіксація оплат', 'Формат навчання', 'Кількість платежів, що залишилось']],
        },
      });
      console.log('Додано заголовки');
    }

    // Обробка пакетами
    for (let i = 0; i < leadIds.length; i += BATCH_SIZE) {
      const batchIds = leadIds.slice(i, i + BATCH_SIZE);
      console.log(`Обробка пакету ${i + 1} - ${i + batchIds.length}`);
      await processBatch(batchIds, sheets, i + 1);
      console.log(`Завершено пакет ${i + 1} - ${i + batchIds.length}`);
    }

    console.log('Оновлення таблиці завершено');
  } catch (error) {
    console.error('Помилка оновлення таблиці:', error.message);
    throw error;
  }
}

// Функція для обробки пакету ID
async function processBatch(batchIds, sheets, startRow) {
  const results = [];
  const API_TOKEN = await getToken();
  for (const leadId of batchIds) {
    let retries = 3; // Number of retries
    while (retries > 0) {
      try {
        const response = await axios.get(`${API_BASE_URL}/${leadId}`, {
          headers: {
            Authorization: `Bearer ${API_TOKEN[0].access_token}`,
          },
        });

        const lead = response.data;
        const customFields = lead.custom_fields_values || [];
        const responsibleUser = await getCRMUser(lead.responsible_user_id);

        const nextPaymentAmount = getCustomFieldValue(customFields, NEXT_PAYMENT_AMOUNT_ID) || '';
        const nextPaymentDate = getCustomFieldValue(customFields, NEXT_PAYMENT_DATE_ID) || '';
        const paymentFixation = getCustomFieldValue(customFields, PAYMENT_FIXATION_ID) || '';
        const studyFormat = getCustomFieldValue(customFields, STUDY_FORMAT) || '';
        const typeService = getCustomFieldValue(customFields, TYPE_SERVICE) || '';
        const paymentRemaining = getCustomFieldValue(customFields, PAYMENT_REMAINING) || '';
        const responsibleName = responsibleUser.name || '';

        results.push([nextPaymentAmount, nextPaymentDate, paymentFixation, studyFormat, typeService, paymentRemaining, responsibleName]);
        break; // Exit retry loop on success
      } catch (error) {
        retries--;
        console.error(`Помилка для ID ${leadId}: ${error.response ? error.response.status : error.message}. Залишилось спроб: ${retries}`);
        if (retries === 0) {
          results.push(['', '', '', '', '', '']); // Записуємо порожні значення у разі помилки
        } else {
          await delay(1000); // Wait 1 second before retrying
        }
      }
    }
    await delay(DELAY_MS);
  }

  // Запис результатів у Google Sheet
  const resultRange = `${SHEET_NAME}!B${startRow + 1}:G${startRow + batchIds.length}`; // Updated range to include columns B to G
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: resultRange,
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: results,
    },
  });
}

// Допоміжна функція для витягнення значення кастомного поля
function getCustomFieldValue(customFields, fieldId) {
  const field = customFields.find(cf => cf.field_id === fieldId);
  if (field && field.values && field.values[0]) {
    if (field.field_type === 'date') {
      return toLocalTime(field.values[0].value);
    }
    return field.values[0].value;
  }
  return null;
}

// Допоміжна функція для затримки
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = { updateTable };