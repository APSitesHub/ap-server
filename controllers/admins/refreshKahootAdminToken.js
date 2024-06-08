const jwt = require("jsonwebtoken");
const { signInKahootAdmin, findKahootAdmin } = require("../../services/adminsServices");

const refreshKahootAdminToken = async (_, res, next) => {

  const admin = await findKahootAdmin();
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

  await signInKahootAdmin(admin._id, { token: newToken });

  res.status(200).json({ newToken, admin: 'KahootAdmin' });
};

module.exports = refreshKahootAdminToken;
