const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const notificationController = require('../controllers/notificationController');

// Route to save push notification token
router.post('/save-token', authMiddleware, notificationController.saveToken);

module.exports = router;
