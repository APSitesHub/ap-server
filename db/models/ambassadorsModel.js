const { Schema, model } = require("mongoose");

const ambassadors = new Schema(
  {
    name: { type: String, required: [true, "Set name"] },
    phone: { type: String, required: [true, "Set phone number"] },
    tgusername: { type: String },
    tag: { type: String },
    course: { type: String, required: [true, "Set course"] },
    specialty: { type: String, required: [true, "Set specialty"] },
    lang: { type: String, required: [true, "Set lang"] },
    level: { type: String, required: [true, "Set level"] },
    crmId: { type: Number },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Ambassadors = model("ambassadors", ambassadors);

module.exports = Ambassadors;
