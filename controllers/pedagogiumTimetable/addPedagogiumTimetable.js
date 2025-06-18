const {
  findPedagogiumTimetable,
  updatePedagogiumTimetable,
  newPedagogiumTimetable,
} = require("../../services/pedagogiumTimetableServices");

const addPedagogiumTimetable = async (req, res) => {
  const { group } = req.body;
  const matchingTimetable = await findPedagogiumTimetable({
    group,
  });

  if (matchingTimetable) {
    return res
      .status(201)
      .json(
        await updatePedagogiumTimetable(
          matchingTimetable._id,
          req.body.schedule
        )
      );
  }
  return res.status(201).json(await newPedagogiumTimetable(req.body));
};

module.exports = addPedagogiumTimetable;
