require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN_AP_TECH_BOT, { polling: true });
const ALLOWED_CHAT_ID = process.env.TELEGRAM_CHAT_ID_Notification_Proyobi_Sales;

// Функція для надсилання повідомлення в чат
const sendMessageToChat = (message, options = {}) => {
    console.log(message);
  if (!ALLOWED_CHAT_ID) {
    console.error('Chat ID is not set');
    return;
  }
  bot.sendMessage(ALLOWED_CHAT_ID, message, { parse_mode: "Markdown", ...options });
};

module.exports = { bot, sendMessageToChat };
