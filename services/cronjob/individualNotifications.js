const { default: axios } = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const { Events, Message } = require("viber-bot");
const {
  getByCrmId,
  newIndividualUser,
  getAllUsersBySrmIds,
  newMessage,
  getByViberChatId,
} = require("../individualUsersServices");
const getCRMLead = require("../crmGetLead");
const { DateTime } = require("luxon");

axios.defaults.baseURL = process.env.BASE_URL;

async function botInit() {
  const bot =
    process.env.NODE_ENV === "production"
      ? new TelegramBot(process.env.TELEGRAM_BOT_TOKEN_AP_NOTIFICATION, {
          polling: true,
        })
      : null;

  return bot;
}

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

async function authUser(code, chatId, isViber = false) {
  const user = await getByCrmId(code, isViber);

  if ((isViber && user?.viberChatId) || (!isViber && user?.chatId)) {
    return "✅ Ви вже підписані на сповіщення";
  }

  const lead = await getCRMLead(code);

  if (!lead) {
    return "⛔ Не коректний код авторизації";
  }

  let newUser = {
    crmId: code,
    name: lead.name,
  };

  if (isViber) {
    newUser.viberChatId = chatId;
  } else {
    newUser.chatId = chatId;
  }

  await newIndividualUser(newUser);

  return "✅ Ви успішно підписались на сповіщення. Тепер тут будуть з'являтись повідомлення про найближчі заняття";
}

async function notificationBotAuthListener(bot) {
  if (bot) {
    bot.on("message", (msg) => {
      if (msg.text === "/start") {
        const chatId = msg.chat.id;

        bot.sendMessage(chatId, "Введіть Ваш код авторизації");

        const listener = async (nextMsg) => {
          if (nextMsg.chat.id === chatId && nextMsg.text !== "/start") {
            const authCode = nextMsg.text;
            const authResult = await authUser(authCode, chatId);

            bot.sendMessage(chatId, authResult);
            bot.removeListener("message", listener);
          }
        };

        bot.on("message", listener);
      }
    });
  }
}

async function viberNotificationBotAuthListener(bot) {
  const userStates = {};

  bot.onSubscribe((response) => {
    const userId = response.userProfile.id;
    userStates[userId] = { waitingForCode: true, chatId: userId };
    response.send(new Message.Text("Введіть ваш код авторизації"));
  });

  bot.on(Events.MESSAGE_RECEIVED, async (message, response) => {
    const authKeyboard = {
      Type: "keyboard",
      Buttons: [
        {
          ActionType: "reply",
          ActionBody: "start",
          Text: "<b>Авторизуватись</b>",
          TextSize: "large",
          BgColor: "#44b360",
        },
      ],
    };

    const userId = response.userProfile.id;
    const messageText = message.text.trim().toLowerCase();

    bot.onSubscribe((response) => {
      const userId = response.userProfile.id;
      userStates[userId] = { waitingForCode: true, chatId: userId };
      response.send(
        new Message.Text(
          "Привіт! Щоб почати, натисніть кнопку 'Авторизуватись'.",
          authKeyboard
        )
      );
    });

    if (messageText === "start") {
      userStates[userId] = { waitingForCode: true, chatId: userId };
      response.send(new Message.Text("Введіть ваш код авторизації"));
    } else if (userStates[userId]?.waitingForCode) {
      const code = messageText;
      const authResult = await authUser(code, userId, true);
      response.send(new Message.Text(authResult));
      userStates[userId].waitingForCode = false;
    } else {
      const isUserAuthorized = await getByViberChatId(userId);

      if (!isUserAuthorized) {
        userStates[userId] = { waitingForCode: true, chatId: userId };
        response.send(
          new Message.Text(
            "Привіт! Щоб почати, натисніть кнопку 'Авторизуватись'.",
            authKeyboard
          )
        );
      }
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

async function dailyIndividualNotifications(tgBot, viberBot) {
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
Все як заплановано — о ${lessonTime} за Київським часом 📚😉`;

      if (tgBot && user.chatId) {
        let isSent = false;
        try {
          await tgBot.sendMessage(user.chatId, message);
          isSent = true;
        } catch (e) {
          console.error("Error sending message to Telegram bot", e);
        }

        try {
          newMessage({
            chatId: user.chatId,
            message: {
              messenger: "telegram",
              datetime: DateTime.now().setZone("Europe/Kyiv"),
              appointmentId: session.id,
              text: message,
              isSent,
            },
          });
        } catch (e) {
          console.error("Failed to add message to db", e);
        }
      }

      if (viberBot && user.viberChatId) {
        let isSent = false;
        try {
          await viberBot.sendMessage(
            { id: user.viberChatId },
            new Message.Text(message)
          );

          isSent = true;
        } catch (e) {
          console.error("Error sending message to Viber bot", e);
        }

        try {
          newMessage({
            chatId: user.chatId,
            message: {
              messenger: "viber",
              datetime: DateTime.now().setZone("Europe/Kyiv"),
              appointmentId: session.id,
              text: message,
              isSent,
            },
          });
        } catch (e) {
          console.error("Failed to add message to db", e);
        }
      }
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
  }
}

async function hourlyIndividualNotifications(tgBot, viberBot) {
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
      const lessonTime = extractTime(session.datetime);
      const message = `📢 Скоро відбудеться заняття! 🧑‍🏫 Тому давай там, доробляй всі справи 📝 і на урок 🕒  
Все як заплановано — о ${lessonTime} за Київським часом 🇺🇦  
Може ще встигнеш домашку зробити 📚😉`;
      if (tgBot && user.chatId) {
        let isSent = false;
        try {
          await tgBot.sendMessage(user.chatId, message);
          isSent = true;
        } catch (e) {
          console.error("Error sending message to Telegram bot", e);
        }

        try {
          newMessage({
            chatId: user.chatId,
            message: {
              messenger: "telegram",
              datetime: DateTime.now().setZone("Europe/Kyiv"),
              appointmentId: session.id,
              text: message,
              isSent,
            },
          });
        } catch (e) {
          console.error("Failed to add message to db", e);
        }
      }

      if (viberBot && user.viberChatId) {
        let isSent = false;
        try {
          await viberBot.sendMessage(
            { id: user.viberChatId },
            new Message.Text(message)
          );

          isSent = true;
        } catch (e) {
          console.error("Error sending message to Viber bot", e);
        }

        try {
          newMessage({
            chatId: user.chatId,
            message: {
              messenger: "viber",
              datetime: DateTime.now().setZone("Europe/Kyiv"),
              appointmentId: session.id,
              text: message,
              isSent,
            },
          });
        } catch (e) {
          console.error("Failed to add message to db", e);
        }
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
  viberNotificationBotAuthListener,
  botInit,
};
