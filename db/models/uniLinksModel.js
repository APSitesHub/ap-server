const { Schema, model } = require("mongoose");

const uniLinks = new Schema(
  {
    pedagogium_logistics: { type: String },
    pedagogium_logistics_2: { type: String },
    pedagogium_prep: { type: String },
    wstijo_logistics: { type: String },
    wstijo_prep: { type: String },
    wsbmir_logistics: { type: String },
    wsbmir_prep: { type: String },
    ewspa_logistics: { type: String },
    ewspa_prep: { type: String },
    merito_logistics: { type: String },
    merito_prep: { type: String },
    wstih_logistics: { type: String },
    wstih_prep: { type: String },
    wskm_logistics: { type: String },
    wskm_prep: { type: String },
    wssip_logistics: { type: String },
    wssip_prep: { type: String },
    wspa_logistics: { type: String },
    wspa_prep: { type: String },
    wse_logistics: { type: String },
    wse_prep: { type: String },
    eu: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UniLinks = model("unilinks", uniLinks);

module.exports = UniLinks;
