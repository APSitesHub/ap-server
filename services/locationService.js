const Users = require('../db/models/usersModel');
const UniUsers = require('../db/models/uniUsersModel');

const updateLocation = async (userId, latitude, longitude) => {
    try {
        let user = await Users.findById(userId);

        if (!user) {
            user = await UniUsers.findById(userId);
            if (!user) {
                throw new Error('User not found in both users and uniUsers');
            }
        }

        if (!user.locationHistory) {
            user.locationHistory = [];
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
