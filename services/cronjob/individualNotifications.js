const { default: axios } = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const {
  getByCrmId,
  newIndividualUser,
  getAllUsersBySrmIds,
  newMessage,
} = require("../individualUsersServices");
const getCRMLead = require("../crmGetLead");
const { DateTime } = require("luxon");

axios.defaults.baseURL = process.env.BASE_URL;

const bot = new TelegramBot(
  process.env.TELEGRAM_BOT_TOKEN_AP_NOTIFICATION,
  {
    polling: true,
  }
);

async function fetchSessions(date, page) {
  const apiUrl = `https://api.alteg.io/api/v1/records/${process.env.ALTEGIO_COMPANY_ID}`;
  const response = await axios.get(apiUrl, {
    headers: {
      Accept: "application/vnd.api.v2+json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ALTEGIO_COMPANY_TOKEN}, User ${process.env.ALTEGIO_USER_TOKEN}`,
    },
    params: {
      page,
      start_date: date,
      end_date: date,
    },
  });

  return response?.data;
}

async function getSessionsByDate(date) {
  try {
    let allSessions = [];
    const response = await fetchSessions(date, 1);
    if (!response?.data) return [];

    allSessions = [...response.data];
    const totalPages = Math.ceil(response.meta.total_count / 100);

    for (let page = 2; page <= totalPages; page++) {
      const res = await fetchSessions(date, page);

      if (res?.data) {
        allSessions.push(...res.data);
      }
    }

    // аппойтменти, що мають клієнта ↓
    const result = allSessions.filter((session) => session.client);

    return result;
  } catch (e) {
    console.error(e);
  }
}

async function notificationBotAuthListener() {
  bot.on("message", (msg) => {
    if (msg.text === "/start") {
      const chatId = msg.chat.id;

      bot.sendMessage(chatId, "Введіть Ваш код авторизації");

      const listener = async (nextMsg) => {
        if (nextMsg.chat.id === chatId && nextMsg.text !== "/start") {
          const authCode = nextMsg.text;

          const isUserAvailable = await getByCrmId(authCode);

          if (isUserAvailable) {
            bot.sendMessage(chatId, "✅ Ви вже підписані на сповіщення");
          }

          const lead = await getCRMLead(authCode);

          if (!lead) {
            bot.sendMessage(chatId, "⛔ Не коректний код авторизації");
          }

          await newIndividualUser({
            crmId: authCode,
            chatId: chatId,
            name: lead.name,
          });

          bot.sendMessage(
            chatId,
            "✅ Ви успішно підписались на сповіщення. Тепер тут будуть з'являтись повідомлення про найближчі заняття"
          );

          bot.removeListener("message", listener);
        }
      };

      bot.on("message", listener);
    }
  });
}

function filterSessionsByTime(sessions, from, to) {
  return sessions.filter((session) => {
    return session.datetime >= from && session.datetime <= to;
  });
}

function getFormattedDate(type = "today") {
  const date = new Date();

  if (type === "tomorrow") {
    date.setDate(date.getDate() + 1);
  }

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

function extractId(str) {
  const parts = str.trim().split(/\s+/);
  for (const part of parts) {
    if (/^\d+$/.test(part)) {
      return part;
    }
  }
  return null;
}

function extractTime(datetimeStr) {
  const date = new Date(datetimeStr);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

async function dailyIndividualNotifications() {
  try {
    const date = getFormattedDate("tomorrow");
    const sessions = await getSessionsByDate(date);

    const users = await getAllUsersBySrmIds(
      sessions.map((session) => extractId(session.client?.name))
    );

    users.forEach(async (user) => {
      const session = sessions.find(
        (session) => extractId(session.client.name) === user.crmId
      );
      const lessonTime = extractTime(session.datetime);

      const message = `📢 Завтра відбудеться заняття! 🧑‍🏫
Все як заплановано — о 17:00 за Київським часом 📚😉`;
      let isSent;
      try {
        await bot.sendMessage(user.chatId, message);
        isSent = true;
      } catch (e) {
        isSent = false;
        console.error("Error sending message to bot", e);
      }

      try {
        newMessage({
          chatId: user.chatId,
          message: {
            datetime: DateTime.now().setZone("Europe/Kyiv"),
            appointmentId: session.id,
            text: message,
            isSent,
          },
        });
      } catch (e) {
        console.error("Failed to add message to db", e);
      }
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
  }
}

async function hourlyIndividualNotifications() {
  try {
    const now = DateTime.now().setZone("Europe/Kyiv");
    const from = now.plus({ minutes: 90 }).toISO(); // через 1.5 години
    const to = now.plus({ minutes: 150 }).toISO(); // через 2.5 години

    const date = getFormattedDate("today");
    const sessions = await getSessionsByDate(date);
    const filtredSessions = filterSessionsByTime(sessions, from, to);

    const users = await getAllUsersBySrmIds(
      filtredSessions.map((session) => extractId(session.client.name))
    );

    users.forEach(async (user) => {
      const session = filtredSessions.find(
        (session) => extractId(session.client.name) === user.crmId
      );
      console.log(session);

      const lessonTime = extractTime(session.datetime);

      const message = `📢 Скоро відбудеться заняття! 🧑‍🏫 Тому давай там, доробляй всі справи 📝 і на урок 🕒  
Все як заплановано — о ${lessonTime} за Київським часом 🇺🇦  
Може ще встигнеш домашку зробити 📚😉`;
      let isSent;
      try {
        await bot.sendMessage(user.chatId, message);
        isSent = true;
      } catch (e) {
        isSent = false;
        console.error("Error sending message to bot", e);
      }

      try {
        newMessage({
          chatId: user.chatId,
          message: {
            datetime: now,
            appointmentId: session.id,
            text: message,
            isSent,
          },
        });
      } catch (e) {
        console.error("Failed to add message to db", e);
      }
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
  }
}

module.exports = {
  hourlyIndividualNotifications,
  dailyIndividualNotifications,
  notificationBotAuthListener,
};
