const { ratingWbUsers } = require("../../services/wbUsersServices");

const getWbUsersForRating = async (_, res) => {
  return res.json(await ratingWbUsers());
};

module.exports = getWbUsersForRating;
