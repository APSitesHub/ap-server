require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const bot =
  process.env.NODE_ENV === "production"
    ? new TelegramBot(process.env.TELEGRAM_BOT_TOKEN_AP_TECH_BOT, {
        polling: true,
      })
    : null;
const ALLOWED_CHAT_ID = process.env.TELEGRAM_CHAT_ID_Notification_Proyobi_Sales;

// Функція для надсилання повідомлення в чат
const sendMessageToChat = (message, options = {}) => {
  if (!ALLOWED_CHAT_ID) {
    console.error("Chat ID is not set");
    return;
  }
  bot &&
    bot.sendMessage(ALLOWED_CHAT_ID, message, {
      parse_mode: "Markdown",
      ...options,
    });
};

module.exports = { bot, sendMessageToChat };
