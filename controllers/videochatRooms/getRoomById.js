const Room = require("../../db/models/videochatRoomModel");

const getRoomById = async (req, res) => {
  try {
    const { login } = req.user;
    const rooms = await Room.find({ roomAdmin: login });

    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching rooms" });
  }
};

module.exports = getRoomById;
