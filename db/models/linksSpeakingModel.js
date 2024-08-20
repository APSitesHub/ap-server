const { Schema, model } = require("mongoose");

const linksSpeaking = new Schema(
  {
    a0: { type: String },
    a0_2: { type: String },
    a1: { type: String },
    a2: { type: String },
    b1: { type: String },
    b2: { type: String },
    c1: { type: String },
    deutscha0: { type: String },
    deutscha0_2: { type: String },
    deutsch: { type: String },
    deutscha2: { type: String },
    deutschb1: { type: String },
    deutschfree: { type: String },
    polskia0: { type: String },
    polskia0_2: { type: String },
    polski: { type: String },
    polskia2: { type: String },
    polskib1: { type: String },
    a0kids: { type: String },
    a1kids: { type: String },
    a2kids: { type: String },
    b1kids: { type: String },
    b2kids: { type: String },
    c1kids: { type: String },
    b1kidsbeginner: { type: String },
    b2kidsbeginner: { type: String },
    dea1kids: { type: String },
    pla1kids: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const LinksSpeaking = model("linksSpeaking", linksSpeaking);

module.exports = LinksSpeaking;
