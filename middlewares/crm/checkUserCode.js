const { findUser } = require("../../services/usersServices");
require("dotenv").config();

const checkUserCode = async (req, _, next) => {
  try {
    const user = await findUser({crmId: req.params.id});
    req.body.user = user;
    console.log(user);
  } catch (error) {
    console.log(error);
  }

  next();
};

module.exports = checkUserCode;
