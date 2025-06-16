const {
  newKahoots,
  getKahootByGroup,
} = require("../../services/pedagogiumKahootsServices");

const addKahoots = async (req, res) => {
  const kahoot = await getKahootByGroup(req.body.group);

  if (kahoot) {
    return res.status(409).json({ error: "Slug already exists" });
  }

  res.status(201).json(await newKahoots(req.body));
};

module.exports = addKahoots;
