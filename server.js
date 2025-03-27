const http = require("http");
const socketIo = require("socket.io");
const { version, validate } = require("uuid");
const app = require("./app");
const connectDB = require("./db/connection");
require("dotenv").config();
const {
  updateLeadsByTrialLessonFields,
} = require("./services/cronjob/trialLesson.job");
const { updateLeadsByVisitedFields } = require("./services/cronjob/visiting");
const cron = require("node-cron");

const server = http.createServer(app);
const io = socketIo(server);

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
  CHANGE_VISIBILITY: "change-visibility",
  MUTE_ALL: "mute-all",
};

const clients = {};
const debug = process.env.NODE_ENV === "development";

io.on("connection", (socket) => {
  socket.on(ACTIONS.JOIN, (config) => {
    const { room: roomID, role, userName, isCameraEnabled, isMicroEnabled } = config;
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
  console.log("Running cron job to update leads by visited fields for POLISH");
  try {
    await updateLeadsByVisitedFields([75659068]); // STATUS_ID_CLOSE_TO_YOU.POLISH
    console.log(
      "Cron job to update leads by visited fields for POLISH FINISHED"
    );
  } catch (error) {
    console.error(
      "Cron job to update leads by visited fields for POLISH FAILED with an error:",
      error
    );
  }
});
// TODO need add children in next week 26.02
cron.schedule("0 3 * * 3", async () => {
  console.log(
    "Running cron job to update leads by visited fields for ENGLISH and ENGLISH_KIDS"
  );
  try {
    await updateLeadsByVisitedFields([75659060]); // STATUS_ID_CLOSE_TO_YOU.ENGLISH, STATUS_ID_CLOSE_TO_YOU.ENGLISH_KIDS 65411360
    console.log(
      "Cron job to update leads by visited fields for ENGLISH and ENGLISH_KIDS FINISHED"
    );
  } catch (error) {
    console.error(
      "Cron job to update leads by visited fields for ENGLISH and ENGLISH_KIDS FAILED with an error:",
      error
    );
  }
});
// TODO need add children in next week 26.02
cron.schedule("0 3 * * 5", async () => {
  console.log(
    "Running cron job to update leads by visited fields for GERMANY and GERMANY_KIDS"
  );
  try {
    await updateLeadsByVisitedFields([75659064]); // STATUS_ID_CLOSE_TO_YOU.GERMANY, STATUS_ID_CLOSE_TO_YOU.GERMANY_KIDS 72736296
    console.log(
      "Cron job to update leads by visited fields for GERMANY and GERMANY_KIDS FINISHED"
    );
  } catch (error) {
    console.error(
      "Cron job to update leads by visited fields for GERMANY and GERMANY_KIDS FAILED with an error:",
      error
    );
  }
});

const startServer = async () => {
  try {
    await connectDB();
    server.listen(process.env.PORT, (error) => {
      if (error) {
        console.log("Server launch error", error);
      }
      console.log(`Database connection successful on port ${process.env.PORT}`);
      console.log(`Run with environment ${process.env.NODE_ENV.toUpperCase()}`);
    });
  } catch (err) {
    console.log(`Failed to launch application with an error: "${err.message}"`);
    process.exit(1);
  }
};

startServer();
