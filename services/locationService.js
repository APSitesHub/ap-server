const Users = require('../db/models/usersModel');

const updateLocation = async (userId, latitude, longitude) => {
    try {
        const user = await Users.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        user.locationHistory.push({ latitude, longitude });
        await user.save();

        return user.locationHistory;
    } catch (error) {
        console.error('Error in locationService.updateLocation:', error);
        throw error;
    }
};

module.exports = {
    updateLocation,
};
