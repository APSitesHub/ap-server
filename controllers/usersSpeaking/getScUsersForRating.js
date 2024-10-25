const { ratingScUsers } = require("../../services/scUsersServices");

const getScUsersForRating = async (_, res) => {
  return res.json(await ratingScUsers());
};

module.exports = getScUsersForRating;
