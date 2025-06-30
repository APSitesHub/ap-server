const { findLessonsByGroup } = require("../../services/uniLessonResultsServices");

const getLessonsByGroup = async (req, res) => {
  try {
    res.status(201).json(await findLessonsByGroup(req.params.group));
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getLessonsByGroup;
