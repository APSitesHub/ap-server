const { Schema, model } = require("mongoose");

const pedagogiumCourses = new Schema(
  {
    courseName: { type: String, required: [true, "Set course name"] },
    slug: { type: String, required: true },
    courseGroups: [Number],
    university: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const PedagogiumCourses = model("pedagogiumcourses", pedagogiumCourses);

module.exports = PedagogiumCourses;
