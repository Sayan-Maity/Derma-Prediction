const mongoose = require("mongoose");

const doctorPatientSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PatientId", doctorPatientSchema);
