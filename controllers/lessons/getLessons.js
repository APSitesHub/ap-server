const { getAllLessons } = require("../../services/lessonsServices");

const getLessons = async (_, res) => {
  return res.json(await getAllLessons());
};

module.exports = getLessons;
