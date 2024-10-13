const { Schema, model } = require("mongoose");

const kahoots = new Schema(
  {
    a0: {
      links: {
        a0_1: String,
        a0_2: String,
        a0_3: String,
        a0_4: String,
        a0_5: String,
      },
    },
    a0_2: {
      links: {
        a0_2_1: String,
        a0_2_2: String,
        a0_2_3: String,
        a0_2_4: String,
        a0_2_5: String,
      },
    },
    a1: {
      links: {
        a1_1: String,
        a1_2: String,
        a1_3: String,
        a1_4: String,
        a1_5: String,
      },
    },
    a2: {
      links: {
        a2_1: String,
        a2_2: String,
        a2_3: String,
        a2_4: String,
        a2_5: String,
      },
    },
    b1: {
      links: {
        b1_1: String,
        b1_2: String,
        b1_3: String,
        b1_4: String,
        b1_5: String,
      },
    },
    b2: {
      links: {
        b2_1: String,
        b2_2: String,
        b2_3: String,
        b2_4: String,
        b2_5: String,
      },
    },
    c1: {
      links: {
        c1_1: String,
        c1_2: String,
        c1_3: String,
        c1_4: String,
        c1_5: String,
      },
    },
    a1free: {
      links: {
        a1free_1: String,
        a1free_2: String,
        a1free_3: String,
        a1free_4: String,
        a1free_5: String,
      },
    },
    a2free: {
      links: {
        a2free_1: String,
        a2free_2: String,
        a2free_3: String,
        a2free_4: String,
        a2free_5: String,
      },
    },
    deutscha0: {
      links: {
        deutscha0_1: String,
        deutscha0_2: String,
        deutscha0_3: String,
        deutscha0_4: String,
        deutscha0_5: String,
      },
    },
    deutscha0_2: {
      links: {
        deutscha0_2_1: String,
        deutscha0_2_2: String,
        deutscha0_2_3: String,
        deutscha0_2_4: String,
        deutscha0_2_5: String,
      },
    },
    deutsch: {
      links: {
        deutsch_1: String,
        deutsch_2: String,
        deutsch_3: String,
        deutsch_4: String,
        deutsch_5: String,
      },
    },
    deutscha2: {
      links: {
        deutscha2_1: String,
        deutscha2_2: String,
        deutscha2_3: String,
        deutscha2_4: String,
        deutscha2_5: String,
      },
    },
    deutschb1: {
      links: {
        deutschb1_1: String,
        deutschb1_2: String,
        deutschb1_3: String,
        deutschb1_4: String,
        deutschb1_5: String,
      },
    },
    deutschb2: {
      links: {
        deutschb2_1: String,
        deutschb2_2: String,
        deutschb2_3: String,
        deutschb2_4: String,
        deutschb2_5: String,
      },
    },
    deutschfree: {
      links: {
        deutschfree_1: String,
        deutschfree_2: String,
        deutschfree_3: String,
        deutschfree_4: String,
        deutschfree_5: String,
        deutschfree_6: String,
      },
    },
    deutscha2free: {
      links: {
        deutscha2free_1: String,
        deutscha2free_2: String,
        deutscha2free_3: String,
        deutscha2free_4: String,
        deutscha2free_5: String,
      },
    },
    polskia0: {
      links: {
        polskia0_1: String,
        polskia0_2: String,
        polskia0_3: String,
        polskia0_4: String,
        polskia0_5: String,
      },
    },
    polskia0_2: {
      links: {
        polskia0_2_1: String,
        polskia0_2_2: String,
        polskia0_2_3: String,
        polskia0_2_4: String,
        polskia0_2_5: String,
      },
    },
    polski: {
      links: {
        polski_1: String,
        polski_2: String,
        polski_3: String,
        polski_4: String,
        polski_5: String,
      },
    },
    polskia2: {
      links: {
        polskia2_1: String,
        polskia2_2: String,
        polskia2_3: String,
        polskia2_4: String,
        polskia2_5: String,
      },
    },
    polskib1: {
      links: {
        polskib1_1: String,
        polskib1_2: String,
        polskib1_3: String,
        polskib1_4: String,
        polskib1_5: String,
      },
    },
    polskib2: {
      links: {
        polskib2_1: String,
        polskib2_2: String,
        polskib2_3: String,
        polskib2_4: String,
        polskib2_5: String,
      },
    },
    polskifree: {
      links: {
        polskifree_1: String,
        polskifree_2: String,
        polskifree_3: String,
        polskifree_4: String,
        polskifree_5: String,
      },
    },
    kidspre: {
      links: {
        kidspre_1: String,
        kidspre_2: String,
        kidspre_3: String,
        kidspre_4: String,
        kidspre_5: String,
        kidspre_6: String,
        kidspre_7: String,
        kidspre_8: String,
        kidspre_9: String,
        kidspre_10: String,
      },
    },
    kidsbeg: {
      links: {
        kidsbeg_1: String,
        kidsbeg_2: String,
        kidsbeg_3: String,
        kidsbeg_4: String,
        kidsbeg_5: String,
        kidsbeg_6: String,
        kidsbeg_7: String,
        kidsbeg_8: String,
        kidsbeg_9: String,
        kidsbeg_10: String,
      },
    },
    kidsmid: {
      links: {
        kidsmid_1: String,
        kidsmid_2: String,
        kidsmid_3: String,
        kidsmid_4: String,
        kidsmid_5: String,
        kidsmid_6: String,
        kidsmid_7: String,
        kidsmid_8: String,
        kidsmid_9: String,
        kidsmid_10: String,
      },
    },
    kidshigh: {
      links: {
        kidshigh_1: String,
        kidshigh_2: String,
        kidshigh_3: String,
        kidshigh_4: String,
        kidshigh_5: String,
        kidshigh_6: String,
        kidshigh_7: String,
        kidshigh_8: String,
        kidshigh_9: String,
        kidshigh_10: String,
      },
    },
    a0kids: {
      links: {
        a0kids_1: String,
        a0kids_2: String,
        a0kids_3: String,
        a0kids_4: String,
        a0kids_5: String,
        a0kids_6: String,
        a0kids_7: String,
        a0kids_8: String,
        a0kids_9: String,
        a0kids_10: String,
      },
    },
    a1kids: {
      links: {
        a1kids_1: String,
        a1kids_2: String,
        a1kids_3: String,
        a1kids_4: String,
        a1kids_5: String,
        a1kids_6: String,
        a1kids_7: String,
        a1kids_8: String,
        a1kids_9: String,
        a1kids_10: String,
      },
    },
    a2kids: {
      links: {
        a2kids_1: String,
        a2kids_2: String,
        a2kids_3: String,
        a2kids_4: String,
        a2kids_5: String,
        a2kids_6: String,
        a2kids_7: String,
        a2kids_8: String,
        a2kids_9: String,
        a2kids_10: String,
      },
    },
    b1kids: {
      links: {
        b1kids_1: String,
        b1kids_2: String,
        b1kids_3: String,
        b1kids_4: String,
        b1kids_5: String,
        b1kids_6: String,
        b1kids_7: String,
        b1kids_8: String,
        b1kids_9: String,
        b1kids_10: String,
      },
    },
    b2kids: {
      links: {
        b2kids_1: String,
        b2kids_2: String,
        b2kids_3: String,
        b2kids_4: String,
        b2kids_5: String,
        b2kids_6: String,
        b2kids_7: String,
        b2kids_8: String,
        b2kids_9: String,
        b2kids_10: String,
      },
    },
    c1kids: {
      links: {
        c1kids_1: String,
        c1kids_2: String,
        c1kids_3: String,
        c1kids_4: String,
        c1kids_5: String,
        c1kids_6: String,
        c1kids_7: String,
        c1kids_8: String,
        c1kids_9: String,
        c1kids_10: String,
      },
    },
    b1kidsbeginner: {
      links: {
        b1kidsbeginner_1: String,
        b1kidsbeginner_2: String,
        b1kidsbeginner_3: String,
        b1kidsbeginner_4: String,
        b1kidsbeginner_5: String,
        b1kidsbeginner_6: String,
        b1kidsbeginner_7: String,
        b1kidsbeginner_8: String,
        b1kidsbeginner_9: String,
        b1kidsbeginner_10: String,
      },
    },
    b2kidsbeginner: {
      links: {
        b2kidsbeginner_1: String,
        b2kidsbeginner_2: String,
        b2kidsbeginner_3: String,
        b2kidsbeginner_4: String,
        b2kidsbeginner_5: String,
        b2kidsbeginner_6: String,
        b2kidsbeginner_7: String,
        b2kidsbeginner_8: String,
        b2kidsbeginner_9: String,
        b2kidsbeginner_10: String,
      },
    },
    a1kidsfree: {
      links: {
        a1kidsfree_1: String,
        a1kidsfree_2: String,
        a1kidsfree_3: String,
        a1kidsfree_4: String,
        a1kidsfree_5: String,
        a1kidsfree_6: String,
        a1kidsfree_7: String,
        a1kidsfree_8: String,
        a1kidsfree_9: String,
        a1kidsfree_10: String,
      },
    },
    dea1kids: {
      links: {
        dea1kids_1: String,
        dea1kids_2: String,
        dea1kids_3: String,
        dea1kids_4: String,
        dea1kids_5: String,
        dea1kids_6: String,
        dea1kids_7: String,
        dea1kids_8: String,
        dea1kids_9: String,
        dea1kids_10: String,
      },
    },
    dekidsfree: {
      links: {
        dekidsfree_1: String,
        dekidsfree_2: String,
        dekidsfree_3: String,
        dekidsfree_4: String,
        dekidsfree_5: String,
        dekidsfree_6: String,
        dekidsfree_7: String,
        dekidsfree_8: String,
        dekidsfree_9: String,
        dekidsfree_10: String,
      },
    },
    pla1kids: {
      links: {
        pla1kids_1: String,
        pla1kids_2: String,
        pla1kids_3: String,
        pla1kids_4: String,
        pla1kids_5: String,
        pla1kids_6: String,
        pla1kids_7: String,
        pla1kids_8: String,
        pla1kids_9: String,
        pla1kids_10: String,
      },
    },
    plkidsfree: {
      links: {
        plkidsfree_1: String,
        plkidsfree_2: String,
        plkidsfree_3: String,
        plkidsfree_4: String,
        plkidsfree_5: String,
        plkidsfree_6: String,
        plkidsfree_7: String,
        plkidsfree_8: String,
        plkidsfree_9: String,
        plkidsfree_10: String,
      },
    },
    trendets: {
      links: {
        trendets_1: String,
        trendets_2: String,
        trendets_3: String,
        trendets_4: String,
        trendets_5: String,
        trendets_6: String,
        trendets_7: String,
        trendets_8: String,
        trendets_9: String,
        trendets_10: String,
      },
    },
    trials: {
      links: {
        trials_1: String,
        trials_2: String,
        trials_3: String,
        trials_4: String,
        trials_5: String,
      },
    },
    trials_de: {
      links: {
        trials_de_1: String,
        trials_de_2: String,
        trials_de_3: String,
        trials_de_4: String,
        trials_de_5: String,
      },
    },
    trials_pl: {
      links: {
        trials_pl_1: String,
        trials_pl_2: String,
        trials_pl_3: String,
        trials_pl_4: String,
        trials_pl_5: String,
      },
    },
    nmt_ukr: {
      links: {
        nmt_ukr_1: String,
        nmt_ukr_2: String,
        nmt_ukr_3: String,
        nmt_ukr_4: String,
        nmt_ukr_5: String,
      },
    },
    nmt_en: {
      links: {
        nmt_en_1: String,
        nmt_en_2: String,
        nmt_en_3: String,
        nmt_en_4: String,
        nmt_en_5: String,
      },
    },
    nmt_math: {
      links: {
        nmt_math_1: String,
        nmt_math_2: String,
        nmt_math_3: String,
        nmt_math_4: String,
        nmt_math_5: String,
      },
    },
    nmt_history: {
      links: {
        nmt_history_1: String,
        nmt_history_2: String,
        nmt_history_3: String,
        nmt_history_4: String,
        nmt_history_5: String,
      },
    },
    preschool: {
      links: {
        preschool_1: String,
        preschool_2: String,
        preschool_3: String,
        preschool_4: String,
        preschool_5: String,
        preschool_6: String,
        preschool_7: String,
        preschool_8: String,
        preschool_9: String,
        preschool_10: String,
      },
    },
    trials_kids: {
      links: {
        trials_kids_1: String,
        trials_kids_2: String,
        trials_kids_3: String,
        trials_kids_4: String,
        trials_kids_5: String,
      },
    },
    test: {
      links: {
        test_1: String,
        test_2: String,
        test_3: String,
        test_4: String,
        test_5: String,
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Kahoots = model("kahoots", kahoots);

module.exports = Kahoots;
