const Joi = require("joi");

const uniKahootsSchema = Joi.object({
  pedagogium_logistics: Joi.object({
    links: Joi.object({
      pedagogium_logistics_1: Joi.string().empty(""),
      pedagogium_logistics_2: Joi.string().empty(""),
      pedagogium_logistics_3: Joi.string().empty(""),
      pedagogium_logistics_4: Joi.string().empty(""),
      pedagogium_logistics_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  pedagogium_logistics_2: Joi.object({
    links: Joi.object({
      pedagogium_logistics_2_1: Joi.string().empty(""),
      pedagogium_logistics_2_2: Joi.string().empty(""),
      pedagogium_logistics_2_3: Joi.string().empty(""),
      pedagogium_logistics_2_4: Joi.string().empty(""),
      pedagogium_logistics_2_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  pedagogium_prep: Joi.object({
    links: Joi.object({
      pedagogium_prep_1: Joi.string().empty(""),
      pedagogium_prep_2: Joi.string().empty(""),
      pedagogium_prep_3: Joi.string().empty(""),
      pedagogium_prep_4: Joi.string().empty(""),
      pedagogium_prep_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  wstijo_logistics: Joi.object({
    links: Joi.object({
      wstijo_logistics_1: Joi.string().empty(""),
      wstijo_logistics_2: Joi.string().empty(""),
      wstijo_logistics_3: Joi.string().empty(""),
      wstijo_logistics_4: Joi.string().empty(""),
      wstijo_logistics_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  wstijo_prep: Joi.object({
    links: Joi.object({
      wstijo_prep_1: Joi.string().empty(""),
      wstijo_prep_2: Joi.string().empty(""),
      wstijo_prep_3: Joi.string().empty(""),
      wstijo_prep_4: Joi.string().empty(""),
      wstijo_prep_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  wsbmir_logistics: Joi.object({
    links: Joi.object({
      wsbmir_logistics_1: Joi.string().empty(""),
      wsbmir_logistics_2: Joi.string().empty(""),
      wsbmir_logistics_3: Joi.string().empty(""),
      wsbmir_logistics_4: Joi.string().empty(""),
      wsbmir_logistics_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  wsbmir_prep: Joi.object({
    links: Joi.object({
      wsbmir_prep_1: Joi.string().empty(""),
      wsbmir_prep_2: Joi.string().empty(""),
      wsbmir_prep_3: Joi.string().empty(""),
      wsbmir_prep_4: Joi.string().empty(""),
      wsbmir_prep_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  ewspa_logistics: Joi.object({
    links: Joi.object({
      ewspa_logistics_1: Joi.string().empty(""),
      ewspa_logistics_2: Joi.string().empty(""),
      ewspa_logistics_3: Joi.string().empty(""),
      ewspa_logistics_4: Joi.string().empty(""),
      ewspa_logistics_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  ewspa_prep: Joi.object({
    links: Joi.object({
      ewspa_prep_1: Joi.string().empty(""),
      ewspa_prep_2: Joi.string().empty(""),
      ewspa_prep_3: Joi.string().empty(""),
      ewspa_prep_4: Joi.string().empty(""),
      ewspa_prep_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  merito_logistics: Joi.object({
    links: Joi.object({
      merito_logistics_1: Joi.string().empty(""),
      merito_logistics_2: Joi.string().empty(""),
      merito_logistics_3: Joi.string().empty(""),
      merito_logistics_4: Joi.string().empty(""),
      merito_logistics_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  merito_prep: Joi.object({
    links: Joi.object({
      merito_prep_1: Joi.string().empty(""),
      merito_prep_2: Joi.string().empty(""),
      merito_prep_3: Joi.string().empty(""),
      merito_prep_4: Joi.string().empty(""),
      merito_prep_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  merito_automation: Joi.object({
    links: Joi.object({
      merito_automation_1: Joi.string().empty(""),
      merito_automation_2: Joi.string().empty(""),
      merito_automation_3: Joi.string().empty(""),
      merito_automation_4: Joi.string().empty(""),
      merito_automation_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  wstih_logistics: Joi.object({
    links: Joi.object({
      wstih_logistics_1: Joi.string().empty(""),
      wstih_logistics_2: Joi.string().empty(""),
      wstih_logistics_3: Joi.string().empty(""),
      wstih_logistics_4: Joi.string().empty(""),
      wstih_logistics_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  wstih_prep: Joi.object({
    links: Joi.object({
      wstih_prep_1: Joi.string().empty(""),
      wstih_prep_2: Joi.string().empty(""),
      wstih_prep_3: Joi.string().empty(""),
      wstih_prep_4: Joi.string().empty(""),
      wstih_prep_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  wskm_logistics: Joi.object({
    links: Joi.object({
      wskm_logistics_1: Joi.string().empty(""),
      wskm_logistics_2: Joi.string().empty(""),
      wskm_logistics_3: Joi.string().empty(""),
      wskm_logistics_4: Joi.string().empty(""),
      wskm_logistics_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  wskm_prep: Joi.object({
    links: Joi.object({
      wskm_prep_1: Joi.string().empty(""),
      wskm_prep_2: Joi.string().empty(""),
      wskm_prep_3: Joi.string().empty(""),
      wskm_prep_4: Joi.string().empty(""),
      wskm_prep_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  wssip_logistics: Joi.object({
    links: Joi.object({
      wssip_logistics_1: Joi.string().empty(""),
      wssip_logistics_2: Joi.string().empty(""),
      wssip_logistics_3: Joi.string().empty(""),
      wssip_logistics_4: Joi.string().empty(""),
      wssip_logistics_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  wssip_prep: Joi.object({
    links: Joi.object({
      wssip_prep_1: Joi.string().empty(""),
      wssip_prep_2: Joi.string().empty(""),
      wssip_prep_3: Joi.string().empty(""),
      wssip_prep_4: Joi.string().empty(""),
      wssip_prep_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  wspa_logistics: Joi.object({
    links: Joi.object({
      wspa_logistics_1: Joi.string().empty(""),
      wspa_logistics_2: Joi.string().empty(""),
      wspa_logistics_3: Joi.string().empty(""),
      wspa_logistics_4: Joi.string().empty(""),
      wspa_logistics_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  wspa_prep: Joi.object({
    links: Joi.object({
      wspa_prep_1: Joi.string().empty(""),
      wspa_prep_2: Joi.string().empty(""),
      wspa_prep_3: Joi.string().empty(""),
      wspa_prep_4: Joi.string().empty(""),
      wspa_prep_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  wse_logistics: Joi.object({
    links: Joi.object({
      wse_logistics_1: Joi.string().empty(""),
      wse_logistics_2: Joi.string().empty(""),
      wse_logistics_3: Joi.string().empty(""),
      wse_logistics_4: Joi.string().empty(""),
      wse_logistics_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  wse_prep: Joi.object({
    links: Joi.object({
      wse_prep_1: Joi.string().empty(""),
      wse_prep_2: Joi.string().empty(""),
      wse_prep_3: Joi.string().empty(""),
      wse_prep_4: Joi.string().empty(""),
      wse_prep_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  eu: Joi.object({
    links: Joi.object({
      eu_1: Joi.string().empty(""),
      eu_2: Joi.string().empty(""),
      eu_3: Joi.string().empty(""),
      eu_4: Joi.string().empty(""),
      eu_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  ssw: Joi.object({
    links: Joi.object({
      ssw_1: Joi.string().empty(""),
      ssw_2: Joi.string().empty(""),
      ssw_3: Joi.string().empty(""),
      ssw_4: Joi.string().empty(""),
      ssw_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  mans: Joi.object({
    links: Joi.object({
      mans_1: Joi.string().empty(""),
      mans_2: Joi.string().empty(""),
      mans_3: Joi.string().empty(""),
      mans_4: Joi.string().empty(""),
      mans_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  ahns: Joi.object({
    links: Joi.object({
      ahns_1: Joi.string().empty(""),
      ahns_2: Joi.string().empty(""),
      ahns_3: Joi.string().empty(""),
      ahns_4: Joi.string().empty(""),
      ahns_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  answp: Joi.object({
    links: Joi.object({
      answp_1: Joi.string().empty(""),
      answp_2: Joi.string().empty(""),
      answp_3: Joi.string().empty(""),
      answp_4: Joi.string().empty(""),
      answp_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
});

const validateUniKahoots = ({ body }, res, next) => {
  const { error } = uniKahootsSchema.validate(body);

  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validateUniKahoots,
};
