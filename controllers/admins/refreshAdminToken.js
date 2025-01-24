const jwt = require("jsonwebtoken");
const { signInAdmin, findAdmin } = require("../../services/adminsServices");

const refreshAdminToken = async (_, res, next) => {
  const admin = await findAdmin();
  console.log(admin);
  if (!admin) {
    next();
  }
  console.log(admin.updatedAt.toDateString());
  try {
    const isTokenOK = jwt.verify(admin.token, process.env.SECRET);
    console.log("verify jwt", isTokenOK);
  } catch (error) {
    console.log(error);
    next();
  }
  const payload = { id: admin._id };
  const newToken = jwt.sign(payload, process.env.SECRET, { expiresIn: "4h" });

  await signInAdmin(admin._id, { token: newToken });

  res.status(200).json({ newToken, admin: "LinkAdmin" });
};

module.exports = refreshAdminToken;
