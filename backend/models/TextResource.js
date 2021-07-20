const mongoose = require("mongoose");

const TextResourceSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    page: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Page",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TextResource", TextResourceSchema);
