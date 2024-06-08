const Tokens = require("../db/models/tokensModel");

const savePrimaryToken = async (body) => await Tokens(body).save();

const getToken = async () => await Tokens.find({});

const refreshToken = async (id, update) =>
  await Tokens.findByIdAndUpdate(id, update, { new: true });

module.exports = {
  savePrimaryToken,
  getToken,
  refreshToken,
};
