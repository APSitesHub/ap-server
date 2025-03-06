const { Schema, model } = require("mongoose");

const videochatRooms = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String
  },
  slug: {
    type: String
  },
  roomAdmin: {
    type: String,
    required: [true, "No mail"]
  }
});

const VideochatRooms = model("videochatRooms", videochatRooms);

module.exports = VideochatRooms;