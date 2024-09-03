const { findScUser } = require("../../services/scUsersServices");

require("dotenv").config();

const checkScUser = async (req, res) => {
  try {
    const user = await findScUser({ userId: req.params.id });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = checkScUser;
