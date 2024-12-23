const { newUniLinks } = require("../../services/uniLinksServices");

const addUniLinks = async (req, res) =>
  res.status(201).json(await newUniLinks(req.body));

module.exports = addUniLinks;
