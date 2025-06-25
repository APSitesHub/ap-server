const Users = require('../db/models/usersModel');

const saveToken = async (userId, token) => {
    try {
        const user = await Users.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Ініціалізуємо масив токенів, якщо його немає
        if (!user.pushNotificationTokens) {
            user.pushNotificationTokens = [];
        }

        // Додаємо токен, якщо його ще немає в масиві
        if (!user.pushNotificationTokens.includes(token)) {
            user.pushNotificationTokens.push(token);
            await user.save();
        }

        return user.pushNotificationTokens;
    } catch (error) {
        console.error('Error in notificationService.saveToken:', error);
        throw error;
    }
};

module.exports = {
    saveToken,
};
