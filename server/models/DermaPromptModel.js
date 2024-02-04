const mongoose = require("mongoose");

const dermaPromptSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    symptoms: [String],
    causes: [String],
    communicable: {
      type: String,
    },
    treatment: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("DermaPrompt", dermaPromptSchema);
