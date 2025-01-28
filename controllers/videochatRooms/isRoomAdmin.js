const Room = require("../../db/models/videochatRoomModel");

const isRoomAdmin = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Room ID is required" });
  }

  try {
    const { login } = req.user;

    const room = await Room.findOne({ id });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const isAdmin = room.roomAdmin === login;

    res.status(200).json({ isRoomAdmin: isAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching room admin" });
  }
};

module.exports = isRoomAdmin;