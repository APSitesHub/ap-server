const jwt = require("jsonwebtoken");
const Users = require("../../db/models/usersModel");
require("dotenv").config();

const authUser = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return res.status(401).json("Not authorized");
  }

  try {
    const verify = jwt.verify(token, process.env.SECRET);
    const { id } = verify;

    const user = await Users.findById(id);
    if (!user || !user.token || user.token !== token) {
      return res.status(401).json("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = authUser;
