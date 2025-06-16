const { updateWbUser } = require("../../services/wbUsersServices");

const editWbUser = async (req, res) => {
  try {
    return res.status(200).json(await updateWbUser(req.params.id, req.body));
  } catch (error) {
    console.error(error);
  }
};

module.exports = editWbUser;
