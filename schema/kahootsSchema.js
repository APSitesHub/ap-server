const Joi = require("joi");

const kahootsSchema = Joi.object({
  a0: Joi.object({
    links: Joi.object({
      a0_1: Joi.string().empty(""),
      a0_2: Joi.string().empty(""),
      a0_3: Joi.string().empty(""),
      a0_4: Joi.string().empty(""),
      a0_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  a0_2: Joi.object({
    links: Joi.object({
      a0_2_1: Joi.string().empty(""),
      a0_2_2: Joi.string().empty(""),
      a0_2_3: Joi.string().empty(""),
      a0_2_4: Joi.string().empty(""),
      a0_2_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  a1: Joi.object({
    links: Joi.object({
      a1_1: Joi.string().empty(""),
      a1_2: Joi.string().empty(""),
      a1_3: Joi.string().empty(""),
      a1_4: Joi.string().empty(""),
      a1_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  a2: Joi.object({
    links: Joi.object({
      a2_1: Joi.string().empty(""),
      a2_2: Joi.string().empty(""),
      a2_3: Joi.string().empty(""),
      a2_4: Joi.string().empty(""),
      a2_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  b1: Joi.object({
    links: Joi.object({
      b1_1: Joi.string().empty(""),
      b1_2: Joi.string().empty(""),
      b1_3: Joi.string().empty(""),
      b1_4: Joi.string().empty(""),
      b1_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  b2: Joi.object({
    links: Joi.object({
      b2_1: Joi.string().empty(""),
      b2_2: Joi.string().empty(""),
      b2_3: Joi.string().empty(""),
      b2_4: Joi.string().empty(""),
      b2_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  c1: Joi.object({
    links: Joi.object({
      c1_1: Joi.string().empty(""),
      c1_2: Joi.string().empty(""),
      c1_3: Joi.string().empty(""),
      c1_4: Joi.string().empty(""),
      c1_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  a1free: Joi.object({
    links: Joi.object({
      a1free_1: Joi.string().empty(""),
      a1free_2: Joi.string().empty(""),
      a1free_3: Joi.string().empty(""),
      a1free_4: Joi.string().empty(""),
      a1free_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  a2free: Joi.object({
    links: Joi.object({
      a2free_1: Joi.string().empty(""),
      a2free_2: Joi.string().empty(""),
      a2free_3: Joi.string().empty(""),
      a2free_4: Joi.string().empty(""),
      a2free_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  deutscha0: Joi.object({
    links: Joi.object({
      deutscha0_1: Joi.string().empty(""),
      deutscha0_2: Joi.string().empty(""),
      deutscha0_3: Joi.string().empty(""),
      deutscha0_4: Joi.string().empty(""),
      deutscha0_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  deutscha0_2: Joi.object({
    links: Joi.object({
      deutscha0_2_1: Joi.string().empty(""),
      deutscha0_2_2: Joi.string().empty(""),
      deutscha0_2_3: Joi.string().empty(""),
      deutscha0_2_4: Joi.string().empty(""),
      deutscha0_2_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  deutsch: Joi.object({
    links: Joi.object({
      deutsch_1: Joi.string().empty(""),
      deutsch_2: Joi.string().empty(""),
      deutsch_3: Joi.string().empty(""),
      deutsch_4: Joi.string().empty(""),
      deutsch_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  deutscha2: Joi.object({
    links: Joi.object({
      deutscha2_1: Joi.string().empty(""),
      deutscha2_2: Joi.string().empty(""),
      deutscha2_3: Joi.string().empty(""),
      deutscha2_4: Joi.string().empty(""),
      deutscha2_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  deutschb1: Joi.object({
    links: Joi.object({
      deutschb1_1: Joi.string().empty(""),
      deutschb1_2: Joi.string().empty(""),
      deutschb1_3: Joi.string().empty(""),
      deutschb1_4: Joi.string().empty(""),
      deutschb1_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  deutschb2: Joi.object({
    links: Joi.object({
      deutschb2_1: Joi.string().empty(""),
      deutschb2_2: Joi.string().empty(""),
      deutschb2_3: Joi.string().empty(""),
      deutschb2_4: Joi.string().empty(""),
      deutschb2_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  deutschfree: Joi.object({
    links: Joi.object({
      deutschfree_1: Joi.string().empty(""),
      deutschfree_2: Joi.string().empty(""),
      deutschfree_3: Joi.string().empty(""),
      deutschfree_4: Joi.string().empty(""),
      deutschfree_5: Joi.string().empty(""),
      deutschfree_6: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  deutscha2free: Joi.object({
    links: Joi.object({
      deutscha2free_1: Joi.string().empty(""),
      deutscha2free_2: Joi.string().empty(""),
      deutscha2free_3: Joi.string().empty(""),
      deutscha2free_4: Joi.string().empty(""),
      deutscha2free_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  polskia0: Joi.object({
    links: Joi.object({
      polskia0_1: Joi.string().empty(""),
      polskia0_2: Joi.string().empty(""),
      polskia0_3: Joi.string().empty(""),
      polskia0_4: Joi.string().empty(""),
      polskia0_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  polskia0_2: Joi.object({
    links: Joi.object({
      polskia0_2_1: Joi.string().empty(""),
      polskia0_2_2: Joi.string().empty(""),
      polskia0_2_3: Joi.string().empty(""),
      polskia0_2_4: Joi.string().empty(""),
      polskia0_2_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  polski: Joi.object({
    links: Joi.object({
      polski_1: Joi.string().empty(""),
      polski_2: Joi.string().empty(""),
      polski_3: Joi.string().empty(""),
      polski_4: Joi.string().empty(""),
      polski_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  polskia2: Joi.object({
    links: Joi.object({
      polskia2_1: Joi.string().empty(""),
      polskia2_2: Joi.string().empty(""),
      polskia2_3: Joi.string().empty(""),
      polskia2_4: Joi.string().empty(""),
      polskia2_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  polskib1: Joi.object({
    links: Joi.object({
      polskib1_1: Joi.string().empty(""),
      polskib1_2: Joi.string().empty(""),
      polskib1_3: Joi.string().empty(""),
      polskib1_4: Joi.string().empty(""),
      polskib1_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  polskib2: Joi.object({
    links: Joi.object({
      polskib2_1: Joi.string().empty(""),
      polskib2_2: Joi.string().empty(""),
      polskib2_3: Joi.string().empty(""),
      polskib2_4: Joi.string().empty(""),
      polskib2_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  polskifree: Joi.object({
    links: Joi.object({
      polskifree_1: Joi.string().empty(""),
      polskifree_2: Joi.string().empty(""),
      polskifree_3: Joi.string().empty(""),
      polskifree_4: Joi.string().empty(""),
      polskifree_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  kidspre: Joi.object({
    links: Joi.object({
      kidspre_1: Joi.string().empty(""),
      kidspre_2: Joi.string().empty(""),
      kidspre_3: Joi.string().empty(""),
      kidspre_4: Joi.string().empty(""),
      kidspre_5: Joi.string().empty(""),
      kidspre_6: Joi.string().empty(""),
      kidspre_7: Joi.string().empty(""),
      kidspre_8: Joi.string().empty(""),
      kidspre_9: Joi.string().empty(""),
      kidspre_10: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  kidsbeg: Joi.object({
    links: Joi.object({
      kidsbeg_1: Joi.string().empty(""),
      kidsbeg_2: Joi.string().empty(""),
      kidsbeg_3: Joi.string().empty(""),
      kidsbeg_4: Joi.string().empty(""),
      kidsbeg_5: Joi.string().empty(""),
      kidsbeg_6: Joi.string().empty(""),
      kidsbeg_7: Joi.string().empty(""),
      kidsbeg_8: Joi.string().empty(""),
      kidsbeg_9: Joi.string().empty(""),
      kidsbeg_10: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  kidsmid: Joi.object({
    links: Joi.object({
      kidsmid_1: Joi.string().empty(""),
      kidsmid_2: Joi.string().empty(""),
      kidsmid_3: Joi.string().empty(""),
      kidsmid_4: Joi.string().empty(""),
      kidsmid_5: Joi.string().empty(""),
      kidsmid_6: Joi.string().empty(""),
      kidsmid_7: Joi.string().empty(""),
      kidsmid_8: Joi.string().empty(""),
      kidsmid_9: Joi.string().empty(""),
      kidsmid_10: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  kidshigh: Joi.object({
    links: Joi.object({
      kidshigh_1: Joi.string().empty(""),
      kidshigh_2: Joi.string().empty(""),
      kidshigh_3: Joi.string().empty(""),
      kidshigh_4: Joi.string().empty(""),
      kidshigh_5: Joi.string().empty(""),
      kidshigh_6: Joi.string().empty(""),
      kidshigh_7: Joi.string().empty(""),
      kidshigh_8: Joi.string().empty(""),
      kidshigh_9: Joi.string().empty(""),
      kidshigh_10: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  a0kids: Joi.object({
    links: Joi.object({
      a0kids_1: Joi.string().empty(""),
      a0kids_2: Joi.string().empty(""),
      a0kids_3: Joi.string().empty(""),
      a0kids_4: Joi.string().empty(""),
      a0kids_5: Joi.string().empty(""),
      a0kids_6: Joi.string().empty(""),
      a0kids_7: Joi.string().empty(""),
      a0kids_8: Joi.string().empty(""),
      a0kids_9: Joi.string().empty(""),
      a0kids_10: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  a1kids: Joi.object({
    links: Joi.object({
      a1kids_1: Joi.string().empty(""),
      a1kids_2: Joi.string().empty(""),
      a1kids_3: Joi.string().empty(""),
      a1kids_4: Joi.string().empty(""),
      a1kids_5: Joi.string().empty(""),
      a1kids_6: Joi.string().empty(""),
      a1kids_7: Joi.string().empty(""),
      a1kids_8: Joi.string().empty(""),
      a1kids_9: Joi.string().empty(""),
      a1kids_10: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  a2kids: Joi.object({
    links: Joi.object({
      a2kids_1: Joi.string().empty(""),
      a2kids_2: Joi.string().empty(""),
      a2kids_3: Joi.string().empty(""),
      a2kids_4: Joi.string().empty(""),
      a2kids_5: Joi.string().empty(""),
      a2kids_6: Joi.string().empty(""),
      a2kids_7: Joi.string().empty(""),
      a2kids_8: Joi.string().empty(""),
      a2kids_9: Joi.string().empty(""),
      a2kids_10: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  b1kids: Joi.object({
    links: Joi.object({
      b1kids_1: Joi.string().empty(""),
      b1kids_2: Joi.string().empty(""),
      b1kids_3: Joi.string().empty(""),
      b1kids_4: Joi.string().empty(""),
      b1kids_5: Joi.string().empty(""),
      b1kids_6: Joi.string().empty(""),
      b1kids_7: Joi.string().empty(""),
      b1kids_8: Joi.string().empty(""),
      b1kids_9: Joi.string().empty(""),
      b1kids_10: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  b2kids: Joi.object({
    links: Joi.object({
      b2kids_1: Joi.string().empty(""),
      b2kids_2: Joi.string().empty(""),
      b2kids_3: Joi.string().empty(""),
      b2kids_4: Joi.string().empty(""),
      b2kids_5: Joi.string().empty(""),
      b2kids_6: Joi.string().empty(""),
      b2kids_7: Joi.string().empty(""),
      b2kids_8: Joi.string().empty(""),
      b2kids_9: Joi.string().empty(""),
      b2kids_10: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  c1kids: Joi.object({
    links: Joi.object({
      c1kids_1: Joi.string().empty(""),
      c1kids_2: Joi.string().empty(""),
      c1kids_3: Joi.string().empty(""),
      c1kids_4: Joi.string().empty(""),
      c1kids_5: Joi.string().empty(""),
      c1kids_6: Joi.string().empty(""),
      c1kids_7: Joi.string().empty(""),
      c1kids_8: Joi.string().empty(""),
      c1kids_9: Joi.string().empty(""),
      c1kids_10: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  b1kidsbeginner: Joi.object({
    links: Joi.object({
      b1kidsbeginner_1: Joi.string().empty(""),
      b1kidsbeginner_2: Joi.string().empty(""),
      b1kidsbeginner_3: Joi.string().empty(""),
      b1kidsbeginner_4: Joi.string().empty(""),
      b1kidsbeginner_5: Joi.string().empty(""),
      b1kidsbeginner_6: Joi.string().empty(""),
      b1kidsbeginner_7: Joi.string().empty(""),
      b1kidsbeginner_8: Joi.string().empty(""),
      b1kidsbeginner_9: Joi.string().empty(""),
      b1kidsbeginner_10: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  b2kidsbeginner: Joi.object({
    links: Joi.object({
      b2kidsbeginner_1: Joi.string().empty(""),
      b2kidsbeginner_2: Joi.string().empty(""),
      b2kidsbeginner_3: Joi.string().empty(""),
      b2kidsbeginner_4: Joi.string().empty(""),
      b2kidsbeginner_5: Joi.string().empty(""),
      b2kidsbeginner_6: Joi.string().empty(""),
      b2kidsbeginner_7: Joi.string().empty(""),
      b2kidsbeginner_8: Joi.string().empty(""),
      b2kidsbeginner_9: Joi.string().empty(""),
      b2kidsbeginner_10: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  a1kidsfree: Joi.object({
    links: Joi.object({
      a1kidsfree_1: Joi.string().empty(""),
      a1kidsfree_2: Joi.string().empty(""),
      a1kidsfree_3: Joi.string().empty(""),
      a1kidsfree_4: Joi.string().empty(""),
      a1kidsfree_5: Joi.string().empty(""),
      a1kidsfree_6: Joi.string().empty(""),
      a1kidsfree_7: Joi.string().empty(""),
      a1kidsfree_8: Joi.string().empty(""),
      a1kidsfree_9: Joi.string().empty(""),
      a1kidsfree_10: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  dea0kids: Joi.object({
    links: Joi.object({
      dea0kids_1: Joi.string().empty(""),
      dea0kids_2: Joi.string().empty(""),
      dea0kids_3: Joi.string().empty(""),
      dea0kids_4: Joi.string().empty(""),
      dea0kids_5: Joi.string().empty(""),
      dea0kids_6: Joi.string().empty(""),
      dea0kids_7: Joi.string().empty(""),
      dea0kids_8: Joi.string().empty(""),
      dea0kids_9: Joi.string().empty(""),
      dea0kids_10: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  dea1kids: Joi.object({
    links: Joi.object({
      dea1kids_1: Joi.string().empty(""),
      dea1kids_2: Joi.string().empty(""),
      dea1kids_3: Joi.string().empty(""),
      dea1kids_4: Joi.string().empty(""),
      dea1kids_5: Joi.string().empty(""),
      dea1kids_6: Joi.string().empty(""),
      dea1kids_7: Joi.string().empty(""),
      dea1kids_8: Joi.string().empty(""),
      dea1kids_9: Joi.string().empty(""),
      dea1kids_10: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  dekidsfree: Joi.object({
    links: Joi.object({
      dekidsfree_1: Joi.string().empty(""),
      dekidsfree_2: Joi.string().empty(""),
      dekidsfree_3: Joi.string().empty(""),
      dekidsfree_4: Joi.string().empty(""),
      dekidsfree_5: Joi.string().empty(""),
      dekidsfree_6: Joi.string().empty(""),
      dekidsfree_7: Joi.string().empty(""),
      dekidsfree_8: Joi.string().empty(""),
      dekidsfree_9: Joi.string().empty(""),
      dekidsfree_10: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  pla1kids: Joi.object({
    links: Joi.object({
      pla1kids_1: Joi.string().empty(""),
      pla1kids_2: Joi.string().empty(""),
      pla1kids_3: Joi.string().empty(""),
      pla1kids_4: Joi.string().empty(""),
      pla1kids_5: Joi.string().empty(""),
      pla1kids_6: Joi.string().empty(""),
      pla1kids_7: Joi.string().empty(""),
      pla1kids_8: Joi.string().empty(""),
      pla1kids_9: Joi.string().empty(""),
      pla1kids_10: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  plkidsfree: Joi.object({
    links: Joi.object({
      plkidsfree_1: Joi.string().empty(""),
      plkidsfree_2: Joi.string().empty(""),
      plkidsfree_3: Joi.string().empty(""),
      plkidsfree_4: Joi.string().empty(""),
      plkidsfree_5: Joi.string().empty(""),
      plkidsfree_6: Joi.string().empty(""),
      plkidsfree_7: Joi.string().empty(""),
      plkidsfree_8: Joi.string().empty(""),
      plkidsfree_9: Joi.string().empty(""),
      plkidsfree_10: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  trendets: Joi.object({
    links: Joi.object({
      trendets_1: Joi.string().empty(""),
      trendets_2: Joi.string().empty(""),
      trendets_3: Joi.string().empty(""),
      trendets_4: Joi.string().empty(""),
      trendets_5: Joi.string().empty(""),
      trendets_6: Joi.string().empty(""),
      trendets_7: Joi.string().empty(""),
      trendets_8: Joi.string().empty(""),
      trendets_9: Joi.string().empty(""),
      trendets_10: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  trials: Joi.object({
    links: Joi.object({
      trials_1: Joi.string().empty(""),
      trials_2: Joi.string().empty(""),
      trials_3: Joi.string().empty(""),
      trials_4: Joi.string().empty(""),
      trials_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  trials_de: Joi.object({
    links: Joi.object({
      trials_de_1: Joi.string().empty(""),
      trials_de_2: Joi.string().empty(""),
      trials_de_3: Joi.string().empty(""),
      trials_de_4: Joi.string().empty(""),
      trials_de_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  trials_pl: Joi.object({
    links: Joi.object({
      trials_pl_1: Joi.string().empty(""),
      trials_pl_2: Joi.string().empty(""),
      trials_pl_3: Joi.string().empty(""),
      trials_pl_4: Joi.string().empty(""),
      trials_pl_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  nmt_ukr: Joi.object({
    links: Joi.object({
      nmt_ukr_1: Joi.string().empty(""),
      nmt_ukr_2: Joi.string().empty(""),
      nmt_ukr_3: Joi.string().empty(""),
      nmt_ukr_4: Joi.string().empty(""),
      nmt_ukr_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  nmt_en: Joi.object({
    links: Joi.object({
      nmt_en_1: Joi.string().empty(""),
      nmt_en_2: Joi.string().empty(""),
      nmt_en_3: Joi.string().empty(""),
      nmt_en_4: Joi.string().empty(""),
      nmt_en_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  nmt_math: Joi.object({
    links: Joi.object({
      nmt_math_1: Joi.string().empty(""),
      nmt_math_2: Joi.string().empty(""),
      nmt_math_3: Joi.string().empty(""),
      nmt_math_4: Joi.string().empty(""),
      nmt_math_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  nmt_history: Joi.object({
    links: Joi.object({
      nmt_history_1: Joi.string().empty(""),
      nmt_history_2: Joi.string().empty(""),
      nmt_history_3: Joi.string().empty(""),
      nmt_history_4: Joi.string().empty(""),
      nmt_history_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  preschool: Joi.object({
    links: Joi.object({
      preschool_1: Joi.string().empty(""),
      preschool_2: Joi.string().empty(""),
      preschool_3: Joi.string().empty(""),
      preschool_4: Joi.string().empty(""),
      preschool_5: Joi.string().empty(""),
      preschool_6: Joi.string().empty(""),
      preschool_7: Joi.string().empty(""),
      preschool_8: Joi.string().empty(""),
      preschool_9: Joi.string().empty(""),
      preschool_10: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  trials_kids: Joi.object({
    links: Joi.object({
      trials_kids_1: Joi.string().empty(""),
      trials_kids_2: Joi.string().empty(""),
      trials_kids_3: Joi.string().empty(""),
      trials_kids_4: Joi.string().empty(""),
      trials_kids_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
  test: Joi.object({
    links: Joi.object({
      test_1: Joi.string().empty(""),
      test_2: Joi.string().empty(""),
      test_3: Joi.string().empty(""),
      test_4: Joi.string().empty(""),
      test_5: Joi.string().empty(""),
    }),
    replace: Joi.bool().required(),
  }),
});

const validateKahoots = ({ body }, res, next) => {
  const { error } = kahootsSchema.validate(body);

  if (error) return res.status(400).json(error.details[0].message);

  next();
};

module.exports = {
  validateKahoots,
};
