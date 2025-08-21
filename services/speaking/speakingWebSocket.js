const { is } = require("date-fns/locale");

const ACTIONS = {
  JOIN: "join",
  LEAVE: "leave",
  DISCONNECT: "disconnect",
  IS_ADMIN_IN_ROOM: "is-admin-in-room",
  TEACHERS_IN_ROOM: "teachers-in-room",
  USERS_IN_ROOM: "users-in-room",
  NEW_USER: "new-user",
  SAVE_ROOMS: "save-rooms",
  SEND_ROOM_NUMBER: "send-room-number",
  TO_GENERAL_ROOM: "to-general-room",
  START_LESSON: "start-lesson",
  END_LESSON: "end-lesson",
  REDIRECT_TO_ROOM: "redirect-to-room",
  USER_DISCONNECTED: "user-disconnected",
  USER_RECONNECTED: "user-reconnected",
};

function speakingWebSocket(io) {
  const sp = io.of("/speaking");

  const rooms = {};

  sp.on("connection", (socket) => {
    socket.on(ACTIONS.JOIN, (data) => {
      const { room, login, userName, userId, role, disconnected } = data;
      socket.join(room);

      if (!rooms[room]) {
        rooms[room] = [];
      }
      const userInRoom = rooms[room].find((u) => u.login === login);

      console.log("connection");
      console.log(userInRoom);

      if (userInRoom && role !== "admin") {
        userInRoom.disconnected = false;
        userInRoom.socketId = socket.id;

        rooms[room].forEach((user) => {
          sp.to(user.socketId).emit(ACTIONS.IS_ADMIN_IN_ROOM, {
            isAdminInRoom: true,
          });

          sp.to(user.socketId).emit(ACTIONS.REDIRECT_TO_ROOM, {
            roomNumber: userInRoom.roomNumber,
          });
        });

        const admins = rooms[room].filter((u) => u.role === "admin");
        admins.forEach((admin) => {
          console.log("USER_IN_ROOM: ", userInRoom);
          console.log(rooms[room]);

          sp.to(admin.socketId).emit(ACTIONS.USER_RECONNECTED, {
            login: userInRoom.login,
            userName: userInRoom.userName,
            role: userInRoom.role,
            userId: userInRoom.userId,
            disconnected: userInRoom.disconnected,
          });
        });

        return;
      }

      rooms[room].push({
        login,
        userName,
        role,
        userId,
        socketId: socket.id,
        disconnected,
      });
      console.log(
        `Користувач ${login} (${userName}) приєднався до кімнати ${room} як ${role}`
      );

      if (role === "admin") {
        console.log(rooms);

        sp.to(socket.id).emit(
          ACTIONS.USERS_IN_ROOM,
          rooms[room].filter((u) => u.role === "user")
        );
        sp.to(socket.id).emit(
          ACTIONS.TEACHERS_IN_ROOM,
          rooms[room].filter((u) => u.role === "teacher")
        );

        const users = rooms[room].filter((u) => u.role !== "admin");
        users.forEach((user) => {
          sp.to(user.socketId).emit(ACTIONS.IS_ADMIN_IN_ROOM, {
            isAdminInRoom: true,
          });
        });
      } else {
        const admins = rooms[room].filter((u) => u.role === "admin");
        socket.emit(ACTIONS.IS_ADMIN_IN_ROOM, {
          isAdminInRoom: admins.length > 0,
        });

        admins.forEach((admin) => {
          if (role !== "admin") {
            sp.to(admin.socketId).emit(ACTIONS.NEW_USER, {
              login,
              userName,
              role,
              userId,
              socketId: socket.id,
            });
          }
        });
      }
    });

    socket.on(ACTIONS.LEAVE, ({ room, login }) => {
      if (rooms[room]) {
        rooms[room] = rooms[room].filter((u) => u.login !== login);
        console.log(`Користувач ${login} залишив кімнату ${room}`);
      }
      socket.leave(room);
    });

    socket.on(ACTIONS.SAVE_ROOMS, ({ room, users }) => {
      console.log("SAVE_ROOMS", users);

      if (!rooms[room]) {
        rooms[room] = [];
      }

      const admins = rooms[room].filter((u) => u.role === "admin");
      const updatedUsers = users.map((user) => {
        const existingUser = rooms[room].find((u) => u.login === user.login);
        if (existingUser) {
          return {
            ...existingUser,
            roomNumber: user.roomNumber,
          };
        }
      });
      rooms[room] = [...updatedUsers, ...admins];
    });

    // socket.on(ACTIONS.TO_GENERAL_ROOM, ({ room }) => {
    //   console.log(`Користувач ${socket.id} відправився до загальної кімнати`);

    //   if (rooms[room]) {
    //     rooms[room].forEach((user) => {
    //       user.roomNumber = null;

    //       console.log(
    //         `Користувач ${user.login} (${user.userName}) відправлений до загальної кімнати`
    //       );

    //       sp.to(user.socketId).emit(ACTIONS.REDIRECT_TO_ROOM, {
    //         roomNumber: null,
    //       });
    //     });
    //   } else {
    //     console.error(`Кімната ${room} не знайдена`);
    //   }
    // });

    socket.on(ACTIONS.START_LESSON, ({ room }) => {
      console.log("lesson start in ", room);

      if (rooms[room]) {
        rooms[room].forEach((user) => {
          console.log(
            `Користувач ${user.login} (${user.userName}) почав урок в кімнаті ${user.roomNumber}`
          );

          sp.to(user.socketId).emit(ACTIONS.REDIRECT_TO_ROOM, {
            roomNumber: user.roomNumber,
          });
        });
      } else {
        console.error(`Кімната ${room} не знайдена`);
      }
    });

    socket.on(ACTIONS.END_LESSON, ({ room }) => {
      console.log("lesson end in ", room);

      if (rooms[room]) {
        rooms[room].forEach((user) => {
          sp.to(user.socketId).emit(ACTIONS.END_LESSON);
        });

        delete rooms[room];
      } else {
        console.error(`Кімната ${room} не знайдена`);
      }
    });

    socket.on(ACTIONS.DISCONNECT, () => {
      console.log(`Користувач з socketId ${socket.id} відключився`);
      for (const room in rooms) {
        const user = rooms[room].find((u) => u.socketId === socket.id);
        if (user) {
          user.disconnected = true;
        }

        if (user && user.role === "admin") {
          rooms[room] = rooms[room].filter((u) => u.socketId !== socket.id);
        }

        if (user && user.role !== "admin") {
          const admins = rooms[room].filter((u) => u.role === "admin");
          console.log("sent");
          console.log(admins);

          admins.forEach((admin) => {
            sp.to(admin.socketId).emit(ACTIONS.USER_DISCONNECTED, {
              login: user.login,
              userName: user.userName,
              role: user.role,
              userId: user.userId,
              disconnected: user.disconnected,
            });
          });
        }
      }
    });
  });
}

module.exports = speakingWebSocket;
