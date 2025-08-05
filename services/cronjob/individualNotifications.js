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

const bot = new TelegramBot("8427966120:AAGtVF9Jli4fQ0vXrhXbALP8e5NPRTIU1rQ", {
  polling: true,
});

const IndividualServicesList = [
  12508353, 12508351, 12508345, 12508341, 12508338, 12508335, 12508333,
  12508332, 12508328, 12508323, 12508321, 12508315, 12508378, 12508377,
  12508374, 12508373, 12508372, 12508369, 12508368, 12508367, 12508364,
  12508363, 12508362, 12508358, 12491752, 12465061, 12465060, 12465059,
  12465058, 12428677, 12293015, 12293013, 12293007, 12293006, 12293004,
  12292994, 12292993, 12292992, 12292987, 12292985, 12292983, 12292980,
  12508569, 12508568, 12508562, 12508559, 12508556, 12508553, 12508552,
  12508551, 12508546, 12508545, 12508544, 12508538, 12508741, 12508740,
  12508736, 12508733, 12508732, 12508728, 12508727, 12508725, 12508719,
  12508718, 12508717, 12508714, 12465071, 12465070, 12465069, 12465068,
  12291800, 12291799, 12291793, 12291790, 12291789, 12291785, 12291784,
  12291783, 12291778, 12291776, 12291775, 12291769, 12484999, 12484998,
  12484996, 12484995, 12392219, 12392217, 12392213, 12291833, 12291831,
  12291826, 12291825, 12291824, 12291821, 12291820, 12291819, 12291813,
  12291812, 12291811, 12291806, 12465065, 12465064, 12465063, 12465062,
  12292346, 12292344, 12292337, 12292309, 12292307, 12292300, 12292298,
  12292296, 12292284, 12292280, 12292279, 12292268, 12485005, 12485004,
  12485003, 12485002, 12392244, 12392242, 12392240, 12292388, 12292387,
  12292381, 12292379, 12292377, 12292376, 12292373, 12292355, 12292354,
  12292347, 12292332, 12292327, 12292318, 12466027, 12466026, 12466021,
  12466012, 12466010, 12466002, 12465939, 12465937, 12465933, 12465932,
  12465931, 12465927, 12466089, 12466087, 12466083, 12466073, 12466072,
  12466060, 12466057, 12466055, 12466049, 12466046, 12466042,
];

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

    // аппойтменти, мають клієнта та є індивідуальними ↓
    const result = allSessions.filter((session) => {
      const hasClient = !!session.client;
      const isIndividual = session.services.some((service) =>
        IndividualServicesList.includes(service.id)
      );

      return hasClient && isIndividual;
    });

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

      const message = `Скоро відбудється індивідуальне заняття, встигни підготуватись. Все як заплпновано, в ${lessonTime} за Київським часом`;
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
      const session = sessions.find(
        (session) => extractId(session.client.name) === user.crmId
      );
      const lessonTime = extractTime(session.datetime);

      const message = `Скоро відбудється індивідуальне заняття, встигни підготуватись. Все як заплпновано, в ${lessonTime} за Київським часом`;
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
