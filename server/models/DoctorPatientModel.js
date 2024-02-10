const mongoose = require("mongoose");

const doctorPatientSchema = new mongoose.Schema(
  {
    patientData: [
      {
        userId: {
          type: String,
          required: true,
        },
        patientName: {
          type: String,
          required: true,
        },
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("PatientId", doctorPatientSchema);
