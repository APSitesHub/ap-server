const { google } = require('googleapis');
const axios = require('axios');
const { getToken } = require('../tokensServices'); // Твій модуль для токена Kommo

/**
 * Налаштування автентифікації для Google Sheets
 */
const getGoogleSheetsAuth = () => {
  console.log(`[${new Date().toISOString()}] Ініціалізація автентифікації Google Sheets`);
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
};

const GOOGLE_SHEET_ID = '1NbGXE4qIp94s7E379xC9fso1zd-jx09Kb_TFHK8_nlk';

/**
 * Отримання лідів із CRM за статусами
 * @param {number} statusId - Масив ID статусів (наприклад, [142, 143])
 * @returns {Promise<Array>} - Масив лідів
 */
async function fetchLeadsByStatuses(statusId) {
  console.log(`[${new Date().toISOString()}] Початок отримання лідів для статуса: ${statusId}`);
  let retries = 3;
  while (retries > 0) {
    try {
      console.log(`[${new Date().toISOString()}] Спроба ${4 - retries} отримати ліди`);
      const currentToken = await getToken();
      console.log(`[${new Date().toISOString()}] Токен отримано успішно`);
      axios.defaults.headers.common.Authorization = `Bearer ${currentToken[0].access_token}`;

      let allLeads = [];
      let page = 1;
      let hasMoreLeads = true;

      while (hasMoreLeads) {
        console.log(`[${new Date().toISOString()}] Отримання сторінки ${page} (ліміт 250)`);
        const response = await axios.get('https://apeducation.kommo.com/api/v4/leads', {
          params: {
            'filter[statuses][0][pipeline_id]': 7001587,
            'filter[statuses][0][status_id][]': statusId,
            page,
            limit: 250,
          },
        });

        const leads = response.data._embedded.leads || [];
        console.log(`[${new Date().toISOString()}] Отримано ${leads.length} лідів на сторінці ${page}`);
        allLeads = allLeads.concat(leads);

        if (leads.length < 250) {
          hasMoreLeads = false;
          console.log(`[${new Date().toISOString()}] Більше лідів немає`);
        } else {
          page++;
        }
      }

      console.log(`[${new Date().toISOString()}] Усього отримано лідів: ${allLeads.length}`);
      return allLeads;
    } catch (error) {
      retries--;
      console.error(`[${new Date().toISOString()}] Помилка отримання лідів: ${error.message}. Залишилось спроб: ${retries}`);
      if (retries === 0) {
        console.error(`[${new Date().toISOString()}] Не вдалося отримати ліди після всіх спроб: ${error.message}`);
        throw new Error(`Failed to fetch leads after retries: ${error.message}`);
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  console.log(`[${new Date().toISOString()}] Повертаємо порожній масив лідів після невдалих спроб`);
  return [];
}

/**
 * Перевірка дублікатів у Google Sheets
 * @param {string[]} leadIds - Масив ID лідів
 * @returns {Promise<string[]>} - Масив ID, які вже є в таблиці
 */
async function checkDuplicateLeads(leadIds) {
  console.log(`[${new Date().toISOString()}] Перевірка дублікатів для ${leadIds.length} ID лідів`);
  try {
    const auth = getGoogleSheetsAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    console.log(`[${new Date().toISOString()}] Отримання існуючих ID лідів із Google Sheets`);
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: 'Аркуш1!A:A',
    });

    const existingIds = (response.data.values || []).flat().map(id => id.toString());
    console.log(`[${new Date().toISOString()}] Знайдено ${existingIds.length} існуючих ID у таблиці`);
    const duplicates = leadIds.filter(id => existingIds.includes(id.toString()));
    console.log(`[${new Date().toISOString()}] Знайдено ${duplicates.length} дублікатів`);
    return duplicates;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Помилка перевірки дублікатів: ${error.message}`);
    return [];
  }
}

/**
 * Обробка даних ліда
 * @param {Object} lead - Дані ліда
 * @returns {Object} - Оброблені дані
 */
function createLeadAnalytics(lead) {
  console.log(`[${new Date().toISOString()}] Обробка ліда ID: ${lead.id}`);
  const customFields = lead.custom_fields_values || [];

  // ID кастомних полів
  const learningFormatFieldId = 558384; // Формат навчання
  const serviceTypeFieldId = 1812897; // Вид послуги
  const annualCourseStreamsFieldId = 1821615; // Потоки річний курс

  const getCustomFieldValue = (fieldId) => {
    const field = customFields.find(f => f.field_id === fieldId);
    return field ? field.values[0].value : '';
  };

  const leadData = {
    lead_id: lead.id.toString(),
    learning_format: getCustomFieldValue(learningFormatFieldId),
    service_type: getCustomFieldValue(serviceTypeFieldId),
    annual_course_streams: getCustomFieldValue(annualCourseStreamsFieldId),
  };

  console.log(`[${new Date().toISOString()}] Оброблено лід ID: ${lead.id}, Дані: ${JSON.stringify(leadData)}`);
  return leadData;
}

/**
 * Запис даних у Google Sheets
 * @param {Object[]} leadsData - Масив даних лідів
 */
async function writeToTargetSheet(leadsData) {
  console.log(`[${new Date().toISOString()}] Запис ${leadsData.length} лідів у Google Sheets`);
  let retries = 3;
  while (retries > 0) {
    try {
      const auth = getGoogleSheetsAuth();
      const sheets = google.sheets({ version: 'v4', auth });

      const values = leadsData.map(data => [
        data.lead_id,
        data.learning_format,
        data.service_type,
        data.annual_course_streams,
      ]);

      console.log(`[${new Date().toISOString()}] Спроба ${4 - retries} запису в таблицю`);
      await sheets.spreadsheets.values.append({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: 'Аркуш1!A1:D1',
        valueInputOption: 'USER_ENTERED',
        resource: { values },
      });

      console.log(`[${new Date().toISOString()}] Успішно записано ${leadsData.length} лідів у таблицю`);
      return true;
    } catch (error) {
      retries--;
      console.error(`[${new Date().toISOString()}] Помилка запису в таблицю: ${error.message}. Залишилось спроб: ${retries}`);
      if (retries === 0) {
        console.error(`[${new Date().toISOString()}] Не вдалося записати в таблицю після всіх спроб: ${error.message}`);
        throw new Error(`Failed to write to sheet: ${error.message}`);
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  console.log(`[${new Date().toISOString()}] Не вдалося записати в таблицю після всіх спроб`);
  return false;
}

/**
 * Основна функція для обробки лідів за статусами
 * @param {number} statusId - Масив ID статусів
 */
async function processLeadsByStatuses(statusId) {
  console.log(`[${new Date().toISOString()}] Початок processLeadsByStatuses для статусa: ${statusId}`);
  try {
    const leads = await fetchLeadsByStatuses(statusId);
    if (!leads.length) {
      console.log(`[${new Date().toISOString()}] Ліди для статусів ${statusId} не знайдені`);
      return;
    }

    console.log(`[${new Date().toISOString()}] Знайдено ${leads.length} лідів`);

    // Перевірка дублікатів
    const leadIds = leads.map(lead => lead.id.toString());
    console.log(`[${new Date().toISOString()}] Перевірка дублікатів для ${leadIds.length} лідів`);
    const duplicates = await checkDuplicateLeads(leadIds);
    const leadsToProcess = leads.filter(lead => !duplicates.includes(lead.id.toString()));

    if (!leadsToProcess.length) {
      console.log(`[${new Date().toISOString()}] Усі ліди є дублікатами, нових лідів для обробки немає`);
      return;
    }

    console.log(`[${new Date().toISOString()}] Знайдено ${leadsToProcess.length} нових лідів для обробки`);

    // Додай заголовки, якщо таблиця порожня
    const auth = getGoogleSheetsAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    console.log(`[${new Date().toISOString()}] Перевірка наявності заголовків у таблиці`);
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: 'Аркуш1!A1:D1',
    });

    if (!response.data.values || response.data.values.length === 0) {
      console.log(`[${new Date().toISOString()}] Таблиця порожня, додаємо заголовки`);
      await sheets.spreadsheets.values.update({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: 'Аркуш1!A1:D1',
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [['Lead ID', 'Формат навчання', 'Вид послуги', 'Потоки річний курс']],
        },
      });
      console.log(`[${new Date().toISOString()}] Заголовки додано успішно`);
    } else {
      console.log(`[${new Date().toISOString()}] Заголовки вже є`);
    }

    // Обробка лідів
    console.log(`[${new Date().toISOString()}] Обробка ${leadsToProcess.length} лідів`);
    const leadsData = leadsToProcess.map(lead => createLeadAnalytics(lead));

    // Запис у Google Sheets
    console.log(`[${new Date().toISOString()}] Запис оброблених лідів у таблицю`);
    await writeToTargetSheet(leadsData);

    console.log(`[${new Date().toISOString()}] Успішно оброблено та записано ${leadsToProcess.length} лідів`);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Помилка в processLeadsByStatuses: ${error.message}`);
  }
  console.log(`[${new Date().toISOString()}] Завершено processLeadsByStatuses`);
}

module.exports = {
  processLeadsByStatuses,
};