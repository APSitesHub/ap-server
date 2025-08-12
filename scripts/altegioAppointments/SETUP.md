# 🚀 Швидке налаштування Altegio Appointments Sync

## Крок 1: Перевірка залежностей

Переконайтесь, що встановлені всі необхідні пакети:

```bash
npm install
```

## Крок 2: Налаштування змінних оточення

Створіть або оновіть файл `.env` у корені проекту:

```bash
# Altegio API
ALTEGIO_COMPANY_ID=your_company_id
ALTEGIO_COMPANY_TOKEN=your_company_token  
ALTEGIO_USER_TOKEN=your_user_token

# Database
DB_URI=mongodb://localhost:27017/your_database_name
```

## Крок 3: Тест підключення

Запустіть тест для перевірки всіх підключень:

```bash
npm run appointments-test
```

Якщо тест пройшов успішно, побачите:
```
🎉 ВСІ ТЕСТИ ПРОЙШЛИ УСПІШНО!
✅ Можете запускати синхронізацію appointments
```

## Крок 4: Перша синхронізація

Запустіть першу синхронізацію (рекомендуємо почати з невеликого періоду):

```bash
# Синхронізація за вчора
npm run sync-appointments yesterday

# Або за конкретну дату
npm run sync-appointments 2025-01-15 2025-01-15
```

## Крок 5: Перевірка результатів

```bash
# Подивіться статистику
npm run appointments-stats

# Результат буде схожий на:
# 📈 Загальна кількість appointments: 45
# ✅ Активних: 42
# 🗑️  Видалених: 3
```

## 🎯 Готово!

Тепер можете використовувати всі доступні команди:

- `npm run sync-appointments today` - синхронізація за сьогодні
- `npm run sync-appointments last-week` - за минулий тиждень  
- `npm run sync-appointments-interactive` - інтерактивний режим
- `npm run appointments-stats` - статистика
- `npm run appointments-validate` - валідація даних

## ❗ Якщо щось не працює

1. **Перевірте змінні оточення:**
   ```bash
   echo $ALTEGIO_COMPANY_ID
   echo $ALTEGIO_COMPANY_TOKEN
   echo $ALTEGIO_USER_TOKEN
   ```

2. **Запустіть тест ще раз:**
   ```bash
   npm run appointments-test
   ```

3. **Перевірте логи помилок** - скрипт виводить детальну інформацію про проблеми

4. **Подивіться README.md** для детальної документації

## 📖 Додаткова документація

- `README.md` - Повна документація
- `EXAMPLES.md` - Приклади використання  
- `index.md` - Короткий огляд скриптів
