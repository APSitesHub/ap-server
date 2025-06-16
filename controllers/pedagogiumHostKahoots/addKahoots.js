const {
  newKahoots,
  getKahootByGroup,
} = require("../../services/pedagogiumHostKahootsServices");

const addKahoots = async (req, res) => {
  const kahoot = await getKahootByGroup(req.body.group);

  if (kahoot) {
    res.status(409).json({ error: "Slug already exists" });
  }

  res.status(201).json(await newKahoots(req.body));
};

module.exports = addKahoots;
