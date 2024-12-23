const UniLinks = require("../../db/models/uniLinksModel");
const { patchUniLinks } = require("../../services/uniLinksServices");

const updateUniLinks = async (req, res) => {
  const links = await UniLinks.findOne({});
  const body = {};
  for (const [key, value] of Object.entries(req.body)) {
    if (value) {
      body[key] = value;
    }
  }
  console.log(body);
  res.status(201).json(await patchUniLinks(links.id, body));
};
module.exports = updateUniLinks;
