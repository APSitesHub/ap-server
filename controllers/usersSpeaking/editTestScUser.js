const { updateTestScUser } = require("../../services/testScUsersServices");

const editTestScUser = async (req, res) => {
  const { feedback, ...data } = req.body;
  res.status(200).json(
    await updateTestScUser(
      { userId: req.params.id },
      {
        $set: data, // Update all other fields
        $push: { feedback: feedback }, // Push new value to the array
      },
      req.body
    )
  );
};

module.exports = editTestScUser;
