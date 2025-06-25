const {
  findLessonsByGroupAndDate,
} = require("../../services/pedagogiumLessonServices");

const getLessonsByGroupAndDate = async (req, res) =>
  res
    .status(201)
    .json(await findLessonsByGroupAndDate(req.params.group, req.params.date));

module.exports = getLessonsByGroupAndDate;
