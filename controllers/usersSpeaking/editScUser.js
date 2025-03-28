const { updateScUser } = require("../../services/scUsersServices");

const editScUser = async (req, res) => {
  const { feedback, ...data } = req.body;
  res.status(200).json(
    await updateScUser(
      { userId: req.params.id },
      {
        $set: data, // Update all other fields
        $push: { feedback: feedback }, // Push new value to the array
      },
      req.body
    )
  );
};

module.exports = editScUser;
