const { v4: uuidv4 } = require("uuid");
const { newRoom } = require("../../services/videochatRoomsServices");

const createRoom = async (req, res) => {
  try {
    const { id, type, name, level } = req.body;
    let roomId = id;

    if (!type) {
      return res.status(400).json({ message: "Room type is required" });
    }

    if (!name) {
      return res.status(400).json({ message: "Room name is required" });
    }

    const { login } = req.user;
    const slug = `${level}`;

    if (!roomId) {
      roomId = uuidv4();
    }

    newRoom({
      id: roomId,
      name,
      type,
      slug,
      roomAdmin: login,
    });

    res.status(201).json(newRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating room" });
  }
};

module.exports = createRoom;
