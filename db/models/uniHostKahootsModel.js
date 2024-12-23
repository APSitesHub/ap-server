const { Schema, model } = require("mongoose");

const uniHostKahoots = new Schema(
  {
    pedagogium_logistics: {
      links: {
        pedagogium_logistics_1: String,
        pedagogium_logistics_2: String,
        pedagogium_logistics_3: String,
        pedagogium_logistics_4: String,
        pedagogium_logistics_5: String,
      },
    },
    pedagogium_prep: {
      links: {
        pedagogium_prep_1: String,
        pedagogium_prep_2: String,
        pedagogium_prep_3: String,
        pedagogium_prep_4: String,
        pedagogium_prep_5: String,
      },
    },
    wstijo_logistics: {
      links: {
        wstijo_logistics_1: String,
        wstijo_logistics_2: String,
        wstijo_logistics_3: String,
        wstijo_logistics_4: String,
        wstijo_logistics_5: String,
      },
    },
    wstijo_prep: {
      links: {
        wstijo_prep_1: String,
        wstijo_prep_2: String,
        wstijo_prep_3: String,
        wstijo_prep_4: String,
        wstijo_prep_5: String,
      },
    },
    wsbmir_logistics: {
      links: {
        wsbmir_logistics_1: String,
        wsbmir_logistics_2: String,
        wsbmir_logistics_3: String,
        wsbmir_logistics_4: String,
        wsbmir_logistics_5: String,
      },
    },
    wsbmir_prep: {
      links: {
        wsbmir_prep_1: String,
        wsbmir_prep_2: String,
        wsbmir_prep_3: String,
        wsbmir_prep_4: String,
        wsbmir_prep_5: String,
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UniHostKahoots = model("unihostkahoots", uniHostKahoots);

module.exports = UniHostKahoots;
