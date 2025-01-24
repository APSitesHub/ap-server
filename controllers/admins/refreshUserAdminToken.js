const jwt = require("jsonwebtoken");
const {
  signInUserAdmin,
  findUserAdmin,
} = require("../../services/adminsServices");

const refreshUserAdminToken = async (_, res, next) => {
  const admin = await findUserAdmin();
  console.log(admin);
  if (!admin) {
    next();
  }
  console.log(admin.updatedAt.toDateString());
  try {
    const isTokenOK = jwt.verify(admin.token, process.env.SECRET);
    if (!isTokenOK) {
      next();
    }
  } catch (error) {
    console.log(error);
    next();
  }
  const payload = { id: admin._id };
  const newToken = jwt.sign(payload, process.env.SECRET, { expiresIn: "12h" });

  await signInUserAdmin(admin._id, { token: newToken });

  res.status(200).json({ newToken, admin: "UserAdmin" });
};

module.exports = refreshUserAdminToken;
