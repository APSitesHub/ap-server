const locationService = require('../services/locationService');

const updateLocation = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;

        if (!latitude || !longitude) {
            return res.status(400).json({ message: 'Latitude and longitude are required' });
        }

        if (isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({ message: 'Latitude and longitude must be numbers' });
        }

        const locationHistory = await locationService.updateLocation(req.user._id, parseFloat(latitude), parseFloat(longitude));

        res.status(200).json({ message: 'Location updated successfully', locationHistory });
    } catch (error) {
        console.error('Error in locationController.updateLocation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    updateLocation,
};
