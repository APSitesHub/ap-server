const { Schema, model } = require("mongoose");

const leadPages = new Schema(
  {
    crmId: { type: Number },
    pageUrl: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const LeadPages = model("leadPages", leadPages);

module.exports = LeadPages;
