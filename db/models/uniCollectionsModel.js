const { Schema, model } = require("mongoose");

const uniCollections = new Schema(
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
    merito_automation: { type: String },
    wstih_logistics: { type: String },
    wstih_prep: { type: String },
    wskm_cnc: { type: String },
    wssip_logistics: { type: String },
    wssip_prep: { type: String },
    wspa_logistics: { type: String },
    wspa_prep: { type: String },
    wse_logistics: { type: String },
    wse_prep: { type: String },
    eu: { type: String },
    ssw: { type: String },
    mans: { type: String },
    ahns: { type: String },
    answp: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UniCollections = model("unicollections", uniCollections);

module.exports = UniCollections;
