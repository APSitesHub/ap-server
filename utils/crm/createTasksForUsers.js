const axios = require("axios");
const { getToken } = require("../../services/tokensServices");

async function createTasksForUsers(usersIds, taskText) {
  try {
    const currentToken = await getToken();
    axios.defaults.headers.common.Authorization = `Bearer ${currentToken[0].access_token}`;
    const completeTill = Math.floor(new Date().getTime() / 1000);

    const tasks = usersIds.map((userId) => {
      return {
        responsible_user_id: userId,
        text: taskText,
        complete_till: completeTill,
        request_id: `task_${userId}_${completeTill}`,
      };
    });

    const response = await axios.post(
      `https://apeducation.kommo.com/api/v4/tasks`,
      tasks
    );

    console.log(`Created task for ${usersIds.length} users`);
    return response.data;
  } catch (error) {
    console.error("Error creating tasks:", error);

    return [];
  }
}

module.exports = createTasksForUsers;
