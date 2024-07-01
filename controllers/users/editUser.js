const { updateUser } = require("../../services/usersServices");

const editUser = async (req, res) => {
  if (req.body.lang === "en" && !req.body.adult) req.body.lang = "enkids";
  res.status(200).json(await updateUser(req.params.id, req.body));
};

module.exports = editUser;
