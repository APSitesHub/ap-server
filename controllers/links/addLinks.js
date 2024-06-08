const { newLinks } = require("../../services/linksServices");

const addLinks = async (req, res) =>
  res.status(201).json(await newLinks(req.body));

module.exports = addLinks;
