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
    wstih_logistics: {
      links: {
        wstih_logistics_1: String,
        wstih_logistics_2: String,
        wstih_logistics_3: String,
        wstih_logistics_4: String,
        wstih_logistics_5: String,
      },
    },
    wstih_prep: {
      links: {
        wstih_prep_1: String,
        wstih_prep_2: String,
        wstih_prep_3: String,
        wstih_prep_4: String,
        wstih_prep_5: String,
      },
    },
    wskm_logistics: {
      links: {
        wskm_logistics_1: String,
        wskm_logistics_2: String,
        wskm_logistics_3: String,
        wskm_logistics_4: String,
        wskm_logistics_5: String,
      },
    },
    wskm_prep: {
      links: {
        wskm_prep_1: String,
        wskm_prep_2: String,
        wskm_prep_3: String,
        wskm_prep_4: String,
        wskm_prep_5: String,
      },
    },
    wssip_logistics: {
      links: {
        wssip_logistics_1: String,
        wssip_logistics_2: String,
        wssip_logistics_3: String,
        wssip_logistics_4: String,
        wssip_logistics_5: String,
      },
    },
    wssip_prep: {
      links: {
        wssip_prep_1: String,
        wssip_prep_2: String,
        wssip_prep_3: String,
        wssip_prep_4: String,
        wssip_prep_5: String,
      },
    },
    wspa_logistics: {
      links: {
        wspa_logistics_1: String,
        wspa_logistics_2: String,
        wspa_logistics_3: String,
        wspa_logistics_4: String,
        wspa_logistics_5: String,
      },
    },
    wspa_prep: {
      links: {
        wspa_prep_1: String,
        wspa_prep_2: String,
        wspa_prep_3: String,
        wspa_prep_4: String,
        wspa_prep_5: String,
      },
    },
    wse_logistics: {
      links: {
        wse_logistics_1: String,
        wse_logistics_2: String,
        wse_logistics_3: String,
        wse_logistics_4: String,
        wse_logistics_5: String,
      },
    },
    wse_prep: {
      links: {
        wse_prep_1: String,
        wse_prep_2: String,
        wse_prep_3: String,
        wse_prep_4: String,
        wse_prep_5: String,
      },
    },
    eu: {
      links: {
        eu_1: String,
        eu_2: String,
        eu_3: String,
        eu_4: String,
        eu_5: String,
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
