const { Schema, model } = require("mongoose");

const uniCollections = new Schema(
  {
    pedagogium_logistics: { type: String },
    pedagogium_prep: { type: String },
    wstijo_logistics: { type: String },
    wstijo_prep: { type: String },
    wsbmir_logistics: { type: String },
    wsbmir_prep: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UniCollections = model("unicollections", uniCollections);

module.exports = UniCollections;
