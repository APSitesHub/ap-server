const { Schema, model } = require("mongoose");

const translateLeadSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name"],
    },
    phone: {
      type: String,
      required: [true, "Set phone number"],
    },
    lang: {
      type: String,
      required: [true, "Set translation language"],
    },
    utm_content: { type: String },
    utm_medium: { type: String },
    utm_campaign: { type: String },
    utm_source: { type: String },
    utm_term: { type: String },
    utm_referrer: { type: String },
    referrer: { type: String },
    gclientid: { type: String },
    gclid: { type: String },
    fbclid: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const TranslationLeads = model("trleads", translateLeadSchema);

module.exports = TranslationLeads;
