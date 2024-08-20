const { findUserByID } = require("../../services/usersServices");
require("dotenv").config();

const checkUser = async (req, _, next) => {
  try {
    const user = await findUserByID(req.params.id);
    req.body.user = user;
  } catch (error) {
    console.log(error);
  }

  next();
};

module.exports = checkUser;
