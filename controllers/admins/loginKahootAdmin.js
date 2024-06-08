const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  signInKahootAdmin,
  findKahootAdmin,
} = require("../../services/adminsServices");

const loginKahootAdmin = async (req, res, next) => {
  const { login, password } = req.body;
  const admin = await findKahootAdmin({ login });
  console.log(admin);
  if (!admin) {
    res.status(401).json("Login or password is wrong");
  }

  const validatedPassword = await bcrypt.compare(password, admin.password);
  if (!validatedPassword) {
    res.status(401).json("Login or password is wrong");
  }

  const payload = { id: admin._id };
  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "2h" });

  await signInKahootAdmin(admin._id, { token });

  res.status(200).json({ token, admin: { login } });
};

module.exports = loginKahootAdmin;
