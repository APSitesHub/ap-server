# Altegio Appointments Sync Scripts

Цей набір скриптів призначений для синхронізації записів (appointments) з Altegio API в базу даних MongoDB.

## Файли

1. **fetchAllAppointments.js** - Основний модуль для витягування записів з Altegio API
2. **syncAppointments.js** - CLI скрипт для зручного запуску синхронізації
3. **runSync.js** - Інтерактивний скрипт для одноразової синхронізації
4. **statsCheck.js** - Скрипт для перевірки статистики та очистки дублікатів
5. **validateData.js** - Скрипт для валідації та виправлення даних

## Налаштування

### Змінні оточення

Створіть файл `.env` або встановіть наступні змінні оточення:

```bash
ALTEGIO_COMPANY_ID=your_company_id
ALTEGIO_COMPANY_TOKEN=your_company_token
ALTEGIO_USER_TOKEN=your_user_token
DB_URI=mongodb://localhost:27017/your_database
```

### Залежності

Переконайтесь, що встановлені всі необхідні пакети:

```bash
npm install axios luxon dotenv mongoose
```

## Використання

### 🚀 Швидкий старт з npm scripts

```bash
# Синхронізація за сьогодні
npm run sync-appointments today

# Синхронізація за минулий тиждень  
npm run sync-appointments last-week

# Інтерактивний режим
npm run sync-appointments-interactive

# Перевірка статистики
npm run appointments-stats

# Валідація даних
npm run appointments-validate

# Очистка дублікатів
npm run appointments-clean
```

### 📋 Основні команди

#### 1. Синхронізація appointments

**Швидкі опції:**
```bash
# За сьогодні
node scripts/altegioAppointments/syncAppointments.js today

# За вчора
node scripts/altegioAppointments/syncAppointments.js yesterday

# За поточний тиждень
node scripts/altegioAppointments/syncAppointments.js this-week

# За минулий тиждень
node scripts/altegioAppointments/syncAppointments.js last-week

# За поточний місяць
node scripts/altegioAppointments/syncAppointments.js this-month

# За минулий місяць
node scripts/altegioAppointments/syncAppointments.js last-month
```

**Кастомний діапазон дат:**
```bash
# Січень 2025
node scripts/altegioAppointments/syncAppointments.js 2025-01-01 2025-01-31

# Конкретна дата
node scripts/altegioAppointments/syncAppointments.js 2025-01-15 2025-01-15
```

#### 2. Інтерактивний режим

```bash
# Запустіть і введіть дати інтерактивно
node scripts/altegioAppointments/runSync.js

# Або з параметрами
node scripts/altegioAppointments/runSync.js 2025-01-01 2025-01-31
```

#### 3. Аналіз та статистика

```bash
# Показати статистику
node scripts/altegioAppointments/statsCheck.js

# Очистити дублікати
node scripts/altegioAppointments/statsCheck.js --clean
```

#### 4. Валідація даних

```bash
# Перевірити цілісність даних
node scripts/altegioAppointments/validateData.js

# Автоматично виправити проблеми
node scripts/altegioAppointments/validateData.js --fix
```

### 📊 Приклад типового workflow

```bash
# 1. Спочатку синхронізуємо дані
npm run sync-appointments last-month

# 2. Перевіряємо статистику
npm run appointments-stats

# 3. Валідуємо дані
npm run appointments-validate

# 4. При необхідності очищаємо дублікати
npm run appointments-clean

# 5. Повторна валідація
npm run appointments-validate
```

## Функціональність

### Що робить скрипт:

1. **Витягує записи з Altegio API** з урахуванням rate limiting (максимум 4 запити за секунду)
2. **Фільтрує індивідуальні уроки** за списком сервісів  
3. **Парсить ім'я клієнта** для витягування CRM ID та імені
4. **Перевіряє на дублі** перед збереженням в БД
5. **Зберігає в MongoDB** тільки нові записи
6. **Обробляє помилки** та логує процес

### Фільтрація:

- ✅ Тільки індивідуальні уроки (за списком service ID)
- ✅ Тільки записи з CRM ID в імені клієнта  
- ✅ Виключає дублікати (перевіряє по `appointmentId`)
- ✅ Включає видалені записи (з прапорцем `isDeleted`)

### Rate Limiting:

- 🚦 Максимум 4 запити за секунду до Altegio API
- 📦 По 50 записів за запит (максимум дозволений API)
- 🔄 Автоматична пагінація для обробки всіх записів

### Логування:

Скрипт виводить детальну інформацію про процес:
- 📊 Кількість оброблених сторінок
- 📈 Кількість записів на кожній сторінці  
- 💾 Збережені та пропущені записи
- 📋 Підсумковий звіт з детальною статистикою

## Структура даних

Скрипт зберігає записи в колекції `altegio-appointments` з наступними полями:

```javascript
{
  appointmentId: String,     // ID запису в Altegio
  leadId: String,           // CRM ID клієнта (з імені)
  leadName: String,         // Ім'я клієнта (без CRM ID)
  teacherId: String,        // ID вчителя
  teacherName: String,      // Ім'я вчителя
  serviceId: String,        // ID сервісу
  serviceName: String,      // Назва сервісу
  startDateTime: Date,      // Час початку уроку
  endDateTime: Date,        // Час закінчення уроку
  status: String,           // Статус відвідування (0,1,-1,2)
  IsTrial: Boolean,         // Чи це пробний урок
  isDeleted: Boolean,       // Чи видалений запис
  createdAt: Date,          // Час створення в БД
  updatedAt: Date           // Час оновлення в БД
}
```

## Статуси відвідування

- `0` - **Pending** (Очікується)
- `1` - **Arrived** (Прийшов)  
- `-1` - **No-show** (Не з'явився)
- `2` - **Confirmed** (Підтверджено)

## Інструменти аналізу

### 📊 Статистика (statsCheck.js)

- Загальна кількість appointments
- Розподіл по статусам відвідування
- Топ-5 вчителів та сервісів
- Статистика по датах
- Перевірка на дублікати

### 🔍 Валідація (validateData.js)

- Перевірка обов'язкових полів
- Валідація формату дат та ID
- Перевірка логіки статусів
- Виявлення аномалій в даних
- Автоматичне виправлення проблем

## Помилки та діагностика

### Типові помилки:

1. **"Missing required environment variables"** - Не встановлені змінні оточення
2. **"Invalid date format"** - Неправильний формат дати
3. **"Teacher not found"** - Вчитель не знайдений в системі
4. **"Error fetching appointments"** - Помилка при запиті до Altegio API
5. **"Rate limit exceeded"** - Перевищено ліміт запитів

### Діагностика:

```bash
# Перевірити змінні оточення
echo $ALTEGIO_COMPANY_ID
echo $ALTEGIO_COMPANY_TOKEN  
echo $ALTEGIO_USER_TOKEN

# Перевірити підключення до БД
npm run appointments-stats

# Валідувати дані
npm run appointments-validate
```

### Логи:

Скрипт виводить детальні логи, які допомагають відстежити:
- ✅ Які записи обробляються
- ⏭️ Які записи пропускаються та чому  
- ❌ Помилки при збереженні
- 📈 Прогрес обробки

## Обмеження

1. **Rate Limiting**: 4 запити за секунду до Altegio API
2. **Pagination**: Максимум 50 записів за запит
3. **Фільтрація**: Тільки індивідуальні уроки за списком сервісів
4. **CRM ID**: Обов'язкова наявність CRM ID в імені клієнта

## Безпека

- 🔒 Всі токени зберігаються в змінних оточення
- 🛡️ Обробка помилок запобігає витоку конфіденційної інформації  
- 📝 Логування не містить чутливих даних
- 🔍 Валідація даних перед збереженням

## Розширені можливості

### Інтеграція в cron jobs

```bash
# Додайте в crontab для щоденної синхронізації
0 2 * * * cd /path/to/ap-server && npm run sync-appointments yesterday

# Щотижнева повна синхронізація
0 3 * * 1 cd /path/to/ap-server && npm run sync-appointments last-week
```

### Моніторинг

```bash
# Скрипт для моніторингу можна запускати кожну годину
0 * * * * cd /path/to/ap-server && npm run appointments-stats | grep "ERROR\|WARNING"
```

### Бекап перед операціями

```bash
# Рекомендується робити бекап перед масовими операціями
mongodump --db your_database --collection altegio-appointments
```
