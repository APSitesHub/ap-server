const notificationService = require('../services/notificationService');

const saveToken = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: 'Token is required' });
        }

        await notificationService.saveToken(req.user._id, token);

        res.status(200).json({ message: 'Token saved successfully' });
    } catch (error) {
        console.error('Error in notificationController.saveToken:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    saveToken,
};
