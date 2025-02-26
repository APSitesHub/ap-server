const axios = require('axios');
const { getToken } = require("../services/tokensServices");

async function createTasksForUser(userId, taskText) {
    try {
        const currentToken = await getToken();
        axios.defaults.headers.common.Authorization = `Bearer ${currentToken[0].access_token}`;
        const tasks = [{
            responsible_user_id: userId,
            task_type_id: 1,
            text: taskText,
            complete_till: Math.floor(new Date().getTime() / 1000),
            entity_id: userId,
            entity_type: "users",
            request_id: `task_${userId}_${this.complete_till}`,
        }];

        const response = await axios.post(
            `https://apeducation.kommo.com/api/v4/tasks`,
            tasks
        );

        console.log(`Created ${response.data.length} tasks for user ${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error creating tasks:', error);
        return [];
    }
}

module.exports = createTasksForUser;
