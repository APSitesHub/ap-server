const { Schema, model } = require("mongoose");

const uniLinks = new Schema(
  {
    pedagogium_logistics: { type: String },
    pedagogium_prep: { type: String },
    wstijo_logistics: { type: String },
    wstijo_prep: { type: String },
    wsbmir_logistics: { type: String },
    wsbmir_prep: { type: String },
    ewspa_logistics: { type: String },
    ewspa_prep: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UniLinks = model("unilinks", uniLinks);

module.exports = UniLinks;
