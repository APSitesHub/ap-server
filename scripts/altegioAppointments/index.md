# Altegio Appointments Scripts

Набір скриптів для синхронізації appointments з Altegio API.

## Доступні скрипти:

### 1. syncAppointments.js
Основний CLI скрипт з предвизначеними опціями.

```bash
# Приклади використання:
node syncAppointments.js today
node syncAppointments.js last-week
node syncAppointments.js 2025-01-01 2025-01-31
```

### 2. runSync.js
Інтерактивний скрипт для одноразової синхронізації.

```bash
# Інтерактивний режим:
node runSync.js

# Або з параметрами:
node runSync.js 2025-01-01 2025-01-31
```

### 3. fetchAllAppointments.js
Основний модуль - можна використовувати в інших скриптах.

```javascript
const { fetchAllAppointments } = require('./fetchAllAppointments');

// Використання в коді
const result = await fetchAllAppointments('2025-01-01', '2025-01-31');
```

## Налаштування

1. Встановіть змінні оточення в `.env`:
```
ALTEGIO_COMPANY_ID=your_company_id
ALTEGIO_COMPANY_TOKEN=your_company_token
ALTEGIO_USER_TOKEN=your_user_token
```

2. Переконайтесь, що MongoDB працює та підключений

3. Встановіть залежності:
```bash
npm install
```

## Детальну документацію див. у README.md
