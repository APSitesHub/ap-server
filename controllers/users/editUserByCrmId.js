const { updateUserByCrmId } = require("../../services/usersServices");

const editUserByCrmId = async (req, res) => {
  res
    .status(200)
    .json(await updateUserByCrmId({ crmId: req.params.id }, req.body));
};

module.exports = editUserByCrmId;
