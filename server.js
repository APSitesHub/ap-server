require("./utils/services/sentry");
const http = require("http");
const socketIo = require("socket.io");
const { version, validate } = require("uuid");
const { app, bot } = require("./app");
const connectDB = require("./db/connection");
const { updateTable } = require("./utils/crm/paymentSheet");
require("dotenv").config();
const {
  updateLeadsByTrialLessonFields,
} = require("./services/cronjob/trialLesson.job");
const { runWeeklyLeadUpdate } = require("./services/cronjob/visiting");
const cron = require("node-cron");
const { processLeadsByStatuses } = require("./services/cronjob/updateGroup");
const {
  notificationBotAuthListener,
  hourlyIndividualNotifications,
  dailyIndividualNotifications,
  botInit,
  viberNotificationBotAuthListener,
} = require("./services/cronjob/individualNotifications");
const server = http.createServer(app);
const io = socketIo(server);

let notficationBot;

const ACTIONS = {
  JOIN: "join",
  LEAVE: "leave",
  ADD_PEER: "add-peer",
  REMOVE_PEER: "remove-peer",
  RELAY_SDP: "relay-sdp",
  RELAY_ICE: "relay-ice",
  ICE_CANDIDATE: "ice-candidate",
  SESSION_DESCRIPTION: "session-description",
  TOGGLE_MICRO: "toggle-micro",
  TOGGLE_CAMERA: "toggle-camera",
  MUTE_ALL: "mute-all",
  CHANGE_VISIBILITY: "change-visibility",
  CHANGE_SPEAKING: "change-speaking",
};

const clients = {};
const debug = process.env.NODE_ENV === "development";

io.on("connection", (socket) => {
  socket.on(ACTIONS.JOIN, (config) => {
    const {
      room: roomID,
      role,
      userName,
      isCameraEnabled,
      isMicroEnabled,
    } = config;
    const { rooms: joinedRooms } = socket;

    if (!clients[roomID]) {
      clients[roomID] = {};
    }

    if (!clients[roomID][socket.id]) {
      clients[roomID][socket.id] = {};
    }

    clients[roomID][socket.id].role = role;
    clients[roomID][socket.id].userName = userName;
    clients[roomID][socket.id].isCameraEnabled = isCameraEnabled;
    clients[roomID][socket.id].isMicroEnabled = isMicroEnabled;

    if (Array.from(joinedRooms).includes(roomID)) {
      return console.warn(`Already joined to ${roomID}`);
    }

    const peers = Array.from(io.sockets.adapter.rooms.get(roomID) || []);

    peers.forEach((clientID) => {
      io.to(clientID).emit(ACTIONS.ADD_PEER, {
        peerID: socket.id,
        clients: clients[roomID],
        createOffer: false,
      });

      socket.emit(ACTIONS.ADD_PEER, {
        peerID: clientID,
        clients: clients[roomID],
        createOffer: true,
      });
    });

    if (debug) {
      console.log("_________CONNECTED_________");
      console.log(config);

      console.log("Connected to room: " + roomID);
      console.log("socket id: " + socket.id);
      console.log("client role: " + role);
      console.log("all peers: ");
      console.log(peers);
      console.log("all clients: ");
      console.log(clients[roomID]);
      console.log("___________________________");
    }

    socket.join(roomID);
  });

  function leaveRoom() {
    const { rooms } = socket;

    Array.from(rooms)
      .filter((roomID) => validate(roomID) && version(roomID) === 4)
      .forEach((roomID) => {
        if (clients[roomID] && clients[roomID][socket.id]) {
          delete clients[roomID][socket.id];
        }

        const peers = Array.from(io.sockets.adapter.rooms.get(roomID) || []);

        peers.forEach((clientID) => {
          io.to(clientID).emit(ACTIONS.REMOVE_PEER, {
            peerID: socket.id,
          });

          socket.emit(ACTIONS.REMOVE_PEER, {
            peerID: clientID,
          });
        });

        socket.leave(roomID);
      });

    if (debug) {
      console.log("_________DISCONNECT___________");
      console.log("socket id: " + socket.id);
      console.log("______________________________");
    }
  }

  socket.on(ACTIONS.LEAVE, leaveRoom);
  socket.on("disconnecting", leaveRoom);

  socket.on(ACTIONS.RELAY_SDP, ({ peerID, sessionDescription }) => {
    io.to(peerID).emit(ACTIONS.SESSION_DESCRIPTION, {
      peerID: socket.id,
      sessionDescription,
    });

    if (debug) {
      console.log("_________RELAY_SDP___________");
      console.log("from: " + socket.id);
      console.log("to: " + peerID);
      console.log("______________________________");
    }
  });

  socket.on(ACTIONS.RELAY_ICE, ({ peerID, iceCandidate }) => {
    io.to(peerID).emit(ACTIONS.ICE_CANDIDATE, {
      peerID: socket.id,
      iceCandidate,
    });

    if (debug) {
      console.log("_________ICE_CANDIDATE___________");
      console.log("from: " + socket.id);
      console.log("to: " + peerID);
      console.log("______________________________");
    }
  });

  // TODO: refactor TOGGLE_MICRO & TOGGLE_CAMERA listeners
  socket.on(ACTIONS.TOGGLE_MICRO, ({ isMicroEnabled }) => {
    const { rooms } = socket;

    Array.from(rooms)
      .filter((roomID) => validate(roomID) && version(roomID) === 4)
      .forEach((roomID) => {
        const peers = Array.from(io.sockets.adapter.rooms.get(roomID) || []);
        clients[roomID][socket.id].isMicroEnabled = isMicroEnabled;

        peers.forEach((clientID) => {
          if (clientID !== socket.id) {
            io.to(clientID).emit(ACTIONS.TOGGLE_MICRO, {
              peerID: socket.id,
              isMicroEnabled,
            });
          }
        });
      });
  });

  socket.on(ACTIONS.TOGGLE_CAMERA, ({ isCameraEnabled }) => {
    const { rooms } = socket;

    Array.from(rooms)
      .filter((roomID) => validate(roomID) && version(roomID) === 4)
      .forEach((roomID) => {
        const peers = Array.from(io.sockets.adapter.rooms.get(roomID) || []);
        clients[roomID][socket.id].isCameraEnabled = isCameraEnabled;

        peers.forEach((clientID) => {
          if (clientID !== socket.id) {
            io.to(clientID).emit(ACTIONS.TOGGLE_CAMERA, {
              peerID: socket.id,
              isCameraEnabled,
            });
          }
        });
      });
  });

  socket.on(ACTIONS.CHANGE_VISIBILITY, ({ client, isVisible }) => {
    io.to(client.clientId).emit(ACTIONS.CHANGE_VISIBILITY, {
      peerID: socket.id,
      isVisible,
    });
  });

  socket.on(ACTIONS.CHANGE_SPEAKING, ({ isSpeaker }) => {
    const { rooms } = socket;

    Array.from(rooms)
      .filter((roomID) => validate(roomID) && version(roomID) === 4)
      .forEach((roomID) => {
        const peers = Array.from(io.sockets.adapter.rooms.get(roomID) || []);

        console.log(`${socket.id} is speak: ${isSpeaker}`);

        peers.forEach((clientID) => {
          if (clientID !== socket.id) {
            io.to(clientID).emit(ACTIONS.CHANGE_SPEAKING, {
              peerID: socket.id,
              isSpeaker,
            });
          }
        });
      });
  });

  socket.on(ACTIONS.MUTE_ALL, () => {
    console.log("mute all");
    const { rooms } = socket;

    Array.from(rooms)
      .filter((roomID) => validate(roomID) && version(roomID) === 4)
      .forEach((roomID) => {
        const peers = Array.from(io.sockets.adapter.rooms.get(roomID) || []);

        peers.forEach((clientID) => {
          if (clientID !== socket.id) {
            io.to(clientID).emit(ACTIONS.MUTE_ALL);
          }
        });
      });
  });

  socket.on("toggle-board-all", ({ isBoardOpen }) => {
    console.log("toggle-board-all", isBoardOpen);
    const { rooms } = socket;

    Array.from(rooms)
      .filter((roomID) => validate(roomID) && version(roomID) === 4)
      .forEach((roomID) => {
        const peers = Array.from(io.sockets.adapter.rooms.get(roomID) || []);

        peers.forEach((clientID) => {
          if (clientID !== socket.id) {
            io.to(clientID).emit("toggle-board-all", {
              isBoardOpen,
            });
          }
        });
      });
  });
});
// Cron job to check custom fields and update status

cron.schedule("45 22 * * *", async () => {
  console.log("Running cron job to update leads by trial lesson fields");
  try {
    await updateLeadsByTrialLessonFields().catch((error) => {
      console.error(
        "Cron job to update leads by trial lesson fields FAILED with an error:",
        error
      );
    });
    await updateLeadsByTrialLessonFields(true).catch((error) => {
      console.error(
        "Cron job to update leads by trial lesson REANIMATION fields FAILED with an error:",
        error
      );
    });
    console.log("Cron job to update leads by trial lesson fields FINISHED");
  } catch (error) {
    console.error(
      "Cron job to update leads by trial lesson fields FAILED with an error:",
      error
    );
  }
});

// Cron job to update leads by visited fields
cron.schedule("0 3 * * 1", async () => {
  console.log("Checking for weekly lead update...");
  await runWeeklyLeadUpdate();
});
// Oleg analytics cron job
cron.schedule(
  "0 2 * * *",
  async () => {
    console.log("Running nightly cron job to update the table");
    try {
      await updateTable();
      console.log("Nightly cron job to update the table FINISHED");
    } catch (error) {
      console.error(
        "Nightly cron job to update the table FAILED with an error:",
        error
      );
    }
  },
  {
    scheduled: true,
    timezone: "Europe/Kiev",
  }
);
cron.schedule(
  "0 3 * * *",
  async () => {
    console.log("Running nightly cron job to update the table v2");
    try {
      await processLeadsByStatuses(75659060);
      await processLeadsByStatuses(75659064);
      await processLeadsByStatuses(75659068);
      await processLeadsByStatuses(65411360);
      await processLeadsByStatuses(72736296);
      await processLeadsByStatuses(75398860);
      await processLeadsByStatuses(75398868);
      await processLeadsByStatuses(58435407);
      await processLeadsByStatuses(58435411);
      console.log("Nightly cron job to update the table FINISHED v2");
    } catch (error) {
      console.error(
        "Nightly cron job to update the table FAILED v2 with an error:",
        error
      );
    }
  },
  {
    scheduled: true,
    timezone: "Europe/Kiev",
  }
);

cron.schedule(
  "0 * * * *", // запускає кожну годину
  async () => {
    try {
      console.log("hourly reminder start");
      await hourlyIndividualNotifications(notficationBot, bot);
      console.log("hourly reminder completed successfully");
    } catch (e) {
      console.error("hourly reminder completed width error: ", e);
    }
  },
  {
    timezone: "Europe/Kiev",
  }
);

cron.schedule(
  "0 12 * * *", // запускає о 12:00 кожного дня
  async () => {
    try {
      console.log("daily reminder start");
      await dailyIndividualNotifications(notficationBot, bot);
      console.log("daily reminder completed successfully");
    } catch (e) {
      console.error("daily reminder completed width error: ", e);
    }
  },
  {
    timezone: "Europe/Kiev",
  }
);

const startServer = async () => {
  try {
    await connectDB();
    notficationBot = await botInit();
    notificationBotAuthListener(notficationBot);
    viberNotificationBotAuthListener(bot);
    server.listen(process.env.PORT, async (error) => {
      if (error) {
        console.log("Server launch error", error);
      }
      console.log(`Database connection successful on port ${process.env.PORT}`);
      console.log(`Run with environment ${process.env.NODE_ENV.toUpperCase()}`);

      if (process.env.NODE_ENV === "production") {
        try {
          const res = await bot.setWebhook(
            `https://ap-server-8qi1.onrender.com/viber/webhook`
          );
          if (res.status === 0) {
            console.log("Viber bot webhook run!");
          } else {
            console.warn("Warning: Viber bot webhook failed: ", res);
          }
        } catch (webhookErr) {
          console.error("Error: Viber bot webhook failed:", webhookErr);
        }
      }
    });
  } catch (err) {
    console.log(`Failed to launch application with an error: "${err.message}"`);
    process.exit(1);
  }
};

startServer();
