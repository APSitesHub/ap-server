const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Room = require("../db/models/videochatRoomModel");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { name, userEmail } = req.body; 
    if (!name || !userEmail) {
      return res.status(400).json({ message: "Name and user email are required" });
    }

    const roomId = uuidv4();

    const newRoom = await Room.create({
      id: roomId,
      name,
      roomAdmin: userEmail,
    });

    res.status(201).json(newRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating room" });
  }
});

router.get("/byEmail", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const rooms = await Room.find({ roomAdmin: email });

    if (!rooms.length) {
      return res.status(404).json({ message: "No rooms found for this email" });
    }

    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching rooms" });
  }
});

module.exports = router;


