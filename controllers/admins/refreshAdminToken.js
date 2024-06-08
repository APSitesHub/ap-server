const jwt = require("jsonwebtoken");
const { signInAdmin, findAdmin } = require("../../services/adminsServices");

const refreshAdminToken = async (_, res, next) => {

  const admin = await findAdmin();
  console.log(admin);
  if (!admin) {
    next();
  }
  console.log(
    admin.updatedAt.toDateString()
  );
  const isTokenOK = jwt.verify(admin.token, process.env.SECRET);
  if (!isTokenOK) {
    next();
  }
  const payload = { id: admin._id };
  const newToken = jwt.sign(payload, process.env.SECRET, { expiresIn: "4h" });

  await signInAdmin(admin._id, { token: newToken });

  res.status(200).json({ newToken, admin: 'LinkAdmin' });
};

module.exports = refreshAdminToken;
