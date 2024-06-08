const Links = require("../../db/models/linksModel");
const { patchLinks } = require("../../services/linksServices");

const updateLinks = async (req, res) => {
  const links = await Links.findOne({});
  const body = {};
  for (const [key, value] of Object.entries(req.body)) {
    if (value) {
      body[key] = value;
    }
  }
  console.log(body);
  res.status(201).json(await patchLinks(links.id, body));
};
module.exports = updateLinks;
