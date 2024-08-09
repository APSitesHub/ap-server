const {
  newTimetable,
  findTimetable,
  updateTimetable,
} = require("../../services/timetableServices");

const addTimetable = async (req, res) => {
  const { lang, level } = req.body;
  console.log("body", req.body);
  console.log("lang", lang);
  console.log("level", level);
  const matchingTimetable = await findTimetable({ lang, level });
  console.log("matchingTimetable", matchingTimetable);
  if (matchingTimetable) {
    return res.status(201).json(await updateTimetable(matchingTimetable._id, req.body.schedule));
  }
  return res.status(201).json(await newTimetable(req.body));
};

module.exports = addTimetable;
