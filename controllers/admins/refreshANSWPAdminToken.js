const jwt = require("jsonwebtoken");
const {
  signInTeacherAdmin,
  findANSWPAdmin,
} = require("../../services/adminsServices");

const refreshANSWPAdminToken = async (_, res, next) => {
  const admin = await findANSWPAdmin();
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
  }
  const payload = { id: admin._id };
  const newToken = jwt.sign(payload, process.env.SECRET, { expiresIn: "12h" });

  await signInTeacherAdmin(admin._id, { token: newToken });

  res.status(200).json({ newToken, admin: "ANSWPAdmin" });
};

module.exports = refreshANSWPAdminToken;
