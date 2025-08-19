const ACTIONS = {
  JOIN: "join",
  LEAVE: "leave",
  TEACHERS_IN_ROOM: "teachers-in-room",
  USERS_IN_ROOM: "users-in-room",
  NEW_USER: "new-user",
  SAVE_ROOMS: "save-rooms",
  SEND_ROOM_NUMBER: "send-room-number",
  START_LESSON: "start-lesson",
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
          sp.to(user.socketId).emit(ACTIONS.REDIRECT_TO_ROOM, {
            roomNumber: userInRoom.roomNumber,
          });
        });

        const admins = rooms[room].filter((u) => u.role === "admin");
        admins.forEach((admin) => {
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
      } else {
        const admins = rooms[room].filter((u) => u.role === "admin");

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
      if (!rooms[room]) {
        rooms[room] = [];
      }

      const admins = rooms[room].filter((u) => u.role === "admin");
      rooms[room] = [...users, ...admins];
    });

    socket.on(ACTIONS.START_LESSON, ({ room }) => {
      console.log("lesson start in ", room);

      if (rooms[room]) {
        rooms[room].forEach((user) => {
          sp.to(user.socketId).emit(ACTIONS.REDIRECT_TO_ROOM, {
            roomNumber: user.roomNumber,
          });
        });
      } else {
        console.error(`Кімната ${room} не знайдена`);
      }
    });

    socket.on("disconnect", () => {
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
