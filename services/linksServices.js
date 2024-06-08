const Links = require("../db/models/linksModel");

const getAllLinks = async () => await Links.find({});

const getFirstLink = async () => await Links.findOne({});

const newLinks = async (body) => await Links(body).save();

const patchLinks = async (id, body) =>
  await Links.findByIdAndUpdate(id, body, { new: true });

module.exports = {
  getAllLinks,
  getFirstLink,
  newLinks,
  patchLinks,
};
