const { Schema, model } = require("mongoose");

const pedagogiumHostKahootsModel = new Schema(
  {
    group: { type: String },
    links: [String],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const PedagogiumHostKahootsModel = model(
  "pedagogium-host-kahoots",
  pedagogiumHostKahootsModel
);

module.exports = PedagogiumHostKahootsModel;
