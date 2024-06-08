const { Schema, model } = require("mongoose");

const leads = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name"],
    },
    phone: {
      type: String,
      required: [true, "Set phone number"],
    },
    tag: { type: String },
    lang: { type: String },
    crmId: { type: Number },
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

const Leads = model("leads", leads);

module.exports = Leads;
