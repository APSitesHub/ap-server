const { Schema, model } = require("mongoose");

const uniKahoots = new Schema(
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
    ewspa_logistics: {
      links: {
        ewspa_logistics_1: String,
        ewspa_logistics_2: String,
        ewspa_logistics_3: String,
        ewspa_logistics_4: String,
        ewspa_logistics_5: String,
      },
    },
    ewspa_prep: {
      links: {
        ewspa_prep_1: String,
        ewspa_prep_2: String,
        ewspa_prep_3: String,
        ewspa_prep_4: String,
        ewspa_prep_5: String,
      },
    },
    merito_logistics: {
      links: {
        merito_logistics_1: String,
        merito_logistics_2: String,
        merito_logistics_3: String,
        merito_logistics_4: String,
        merito_logistics_5: String,
      },
    },
    merito_prep: {
      links: {
        merito_prep_1: String,
        merito_prep_2: String,
        merito_prep_3: String,
        merito_prep_4: String,
        merito_prep_5: String,
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UniKahoots = model("unikahoots", uniKahoots);

module.exports = UniKahoots;
