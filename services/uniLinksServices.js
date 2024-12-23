const UniLinks = require("../db/models/uniLinksModel");

const getAllUniLinks = async () => await UniLinks.find({});

const getFirstUniLink = async () => await UniLinks.findOne({});

const newUniLinks = async (body) => await UniLinks(body).save();

const patchUniLinks = async (id, body) =>
  await UniLinks.findByIdAndUpdate(id, body, { new: true });

module.exports = {
  getAllUniLinks,
  getFirstUniLink,
  newUniLinks,
  patchUniLinks,
};
