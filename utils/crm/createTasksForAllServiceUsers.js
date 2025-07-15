const crmGetUsersByGroups = require("../../services/crmGetUsersByGroups");
const createTasksForUsers = require("./createTasksForUsers");

const SERVICE_USERS_GROUP_ID = 456279;
const SALES_USERS_GROUP_ID = 438271;

async function createTasksForAllServiceUsers(taskText) {
  try {
    const usersIds = await crmGetUsersByGroups([
      SERVICE_USERS_GROUP_ID,
      SALES_USERS_GROUP_ID,
    ]);

    console.log(usersIds);

    await createTasksForUsers(usersIds, taskText);
  } catch (error) {
    console.error("Error creating tasks:", error);
    return [];
  }
}

module.exports = createTasksForAllServiceUsers;
