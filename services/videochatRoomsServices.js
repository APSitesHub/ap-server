const Rooms = require("../db/models/videochatRoomModel");

const findRoomById = async (id) => await Rooms.findOne({ id });

const newRoom = async (body) => await Rooms(body).save();

module.exports = {
  findRoomById,
  newRoom,
};
