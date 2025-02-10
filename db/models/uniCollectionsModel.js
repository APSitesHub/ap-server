const { Schema, model } = require("mongoose");

const uniCollections = new Schema(
  {
    pedagogium_logistics: { type: String },
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UniCollections = model("unicollections", uniCollections);

module.exports = UniCollections;
