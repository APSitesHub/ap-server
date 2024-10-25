const jwt = require("jsonwebtoken");
const Admins = require("../../db/models/adminsModel");
require("dotenv").config();

const authTeacherAdmin = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return res.status(401).json("Not authorized");
  }

  try {
    const verify = jwt.verify(token, process.env.SECRET);
    const { id } = verify;

    const admin = await Admins.findById(id);
    if (!admin || !admin.token || admin.token !== token) {
      return res.status(401).json("Not authorized");
    }
    req.user = admin;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = authTeacherAdmin;
