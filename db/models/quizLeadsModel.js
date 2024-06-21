const { Schema, model } = require("mongoose");

const quizLeadSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name"],
    },
    phone: {
      type: String,
      required: [true, "Set phone number"],
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const QuizLeads = model("qleads", quizLeadSchema);

module.exports = QuizLeads;
