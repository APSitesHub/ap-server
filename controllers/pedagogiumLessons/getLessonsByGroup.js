const { findLessonsByGroup } = require("../../services/pedagogiumLessonServices");

const getLessonsByGroup = async (req, res) =>
  res.status(201).json(await findLessonsByGroup(req.params.group));

module.exports = getLessonsByGroup;
