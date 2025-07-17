const axios = require("axios");
const { getToken } = require("./tokensServices");

async function crmGetUsersByGroups(rolesIds) {
  try {
    const currentToken = await getToken();
    axios.defaults.headers.common.Authorization = `Bearer ${currentToken[0].access_token}`;
    let allUsers = [];
    let page = 1;
    let hasMoreUsers = true;

    while (hasMoreUsers) {
      const response = await axios.get(
        "https://apeducation.kommo.com/api/v4/users",
        {
          params: {
            page,
            limit: 250,
          },
        }
      );

      const users = response.data._embedded.users;
      allUsers = allUsers.concat(users);

      if (users.length < 250) {
        hasMoreUsers = false;
      } else {
        page++;
      }
    }

    const filtredUsers = allUsers.filter((user) => {
      return (
        user.rights.is_active === true &&
        rolesIds.includes(user.rights.group_id)
      );
    });

    return filtredUsers.map(user => user.id)
  } catch (e) {
    console.error(e);
  }
}

module.exports = crmGetUsersByGroups;
