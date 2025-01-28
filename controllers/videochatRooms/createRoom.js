const { v4: uuidv4 } = require("uuid");
const Room = require("../../db/models/videochatRoomModel");

const createRoom = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Room name is required" });
    }

    const { login } = req.user;

    const roomId = uuidv4();

    const newRoom = await Room.create({
      id: roomId,
      name,
      roomAdmin: login,
    });

    res.status(201).json(newRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating room" });
  }
};

module.exports = createRoom;
