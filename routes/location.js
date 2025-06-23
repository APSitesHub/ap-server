const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const locationController = require('../controllers/locationController');

router.post('/update-location', authMiddleware, locationController.updateLocation);

module.exports = router;
