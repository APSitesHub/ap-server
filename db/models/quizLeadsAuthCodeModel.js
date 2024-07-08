const { Schema, model } = require("mongoose");

const quizLeadSchema = new Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    authCode: {
      type: String,
    },
    mail: {
      type: String,
    },
    password: {
      type: String,
    },
    tag: { type: String },
    lang: {
      type: String,
      required: [true, "Set translation language"],
    },
    crmId: { type: Number },
    contactId: { type: Number },
    adult: {
      type: Boolean,
      required: [true, "Set adult"],
    },
    age: {
      type: String,
      required: [true, "Set age"],
    },
    knowledge: {
      type: String,
      required: [true, "Set knowledge level"],
    },
    quantity: {
      type: String,
      required: [true, "Set lessons quantity"],
    },
    difficulties: {
      type: String,
      required: [true, "Set difficulties"],
    },
    interests: {
      type: String,
      required: [true, "Set interests"],
    },
    leadPage: {
      type: String,
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

const QuizAuthLeads = model("qauthleads", quizLeadSchema);

module.exports = QuizAuthLeads;
