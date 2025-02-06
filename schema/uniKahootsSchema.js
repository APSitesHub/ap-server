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
});

const validateUniKahoots = ({ body }, res, next) => {
  const { error } = uniKahootsSchema.validate(body);

  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validateUniKahoots,
};
