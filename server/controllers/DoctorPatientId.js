const DoctorPatientModel = require("../models/DoctorPatientModel");

// GET
module.exports.getDoctorPatientId = async (req, res) => {
  try {
    const patientId = await DoctorPatientModel.find();
    res.json(patientId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST
module.exports.postDoctorPatientId = async (req, res) => {
  const { userId, patientName } = req.body;
  try {
    const doctorPatientInstance = new DoctorPatientModel();

    doctorPatientInstance.patientData.push({
      userId,
      patientName,
    });
    await doctorPatientInstance.save();
    res.json({ message: "Id got Saved" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
