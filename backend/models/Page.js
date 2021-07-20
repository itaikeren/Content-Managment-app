const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    textResources: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag", required: false, default: [] }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Page", PageSchema);
