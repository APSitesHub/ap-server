const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  signInTeacherAdmin,
  findMANSAdmin,
} = require("../../services/adminsServices");

const loginMANSAdmin = async (req, res, next) => {
  const { login, password } = req.body;
  const admin = await findMANSAdmin({ login });
  console.log(admin);
  if (!admin) {
    res.status(401).json("Login or password is wrong");
  }

  const validatedPassword = await bcrypt.compare(password, admin.password);
  if (!validatedPassword) {
    return res.status(401).json("Login or password is wrong");
  }

  const payload = { id: admin._id };
  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "12h" });

  await signInTeacherAdmin(admin._id, { token });

  res.status(200).json({ token, admin: { login } });
};

module.exports = loginMANSAdmin;
