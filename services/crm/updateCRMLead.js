const axios = require('axios');
const { format } = require('date-fns');
const { getToken } = require("../tokensServices");
const { uk } = require("date-fns/locale");
const { signInUser } = require("../usersServices");



async function updateLoginTime(leadId, user) {
    const currentTimeInKiev = format(new Date(), "yyyy-MM-dd'T'HH:mm:ssXXX", { locale: uk });
    const visited = user.visited
    try {
      await signInUser(user._id, { visited });
    } catch (error) {
      console.log(error);
    }
    const postBody = {
        custom_fields_values: [
            {
                field_id: 1826097,
                field_name: "Останній вхід на урок",
                values: [
                    {
                        value: currentTimeInKiev
                    }
                ]
            }
        ]
    }
    try {
      const currentToken = await getToken();
      
      axios.defaults.headers.common.Authorization = `Bearer ${currentToken[0].access_token}`;
  
      const crmLead = leadId && await axios.patch(
        `https://apeducation.kommo.com/api/v4/leads/${leadId}`,
        postBody
      ).catch(err => {
        console.error(JSON.stringify(err.response.data));
        return null;
      });
      return crmLead;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

module.exports = {
    updateLoginTime,
};