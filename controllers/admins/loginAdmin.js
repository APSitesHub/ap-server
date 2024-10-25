const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { signInAdmin, findAdmin } = require("../../services/adminsServices");

const loginAdmin = async (req, res, next) => {
  const { login, password } = req.body;
  const admin = await findAdmin({ login });
  console.log(admin);
  if (!admin) {
    res.status(401).json("Login or password is wrong");
  }

  const validatedPassword = await bcrypt.compare(password, admin.password);
  if (!validatedPassword) {
    return res.status(401).json("Login or password is wrong");
  }

  const payload = { id: admin._id };
  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "2h" });

  await signInAdmin(admin._id, { token });

  res.status(200).json({ token, admin: { login } });
};

module.exports = loginAdmin;
