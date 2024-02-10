const express = require("express")
const { dermaPrompt } = require("../controllers/DermaPrompt")
const { educationPrompt } = require("../controllers/EducationPrompt")
const { recommendationPrompt } = require("../controllers/RecommendationPrompt")
const { getCommunityForum, postCommunityForum } = require("../controllers/CommunityForum")
const { checkout, paymentVerification } = require("../controllers/Payment")
const authMiddleware = require("../middlewares/authMiddleware");
const { getDoctorPatientId, postDoctorPatientId } = require("../controllers/DoctorPatientId")

const router = express.Router()

router.post("/dermaFinalPrompt", dermaPrompt)
router.post("/educationPrompt", educationPrompt)
router.post("/recommendationPrompt", recommendationPrompt)
router.post("/postCommunityForum", postCommunityForum)
router.get("/getCommunityForum", getCommunityForum)
router.post("/checkout", authMiddleware, checkout)
router.post("/paymentVerification", authMiddleware, paymentVerification)
router.get("/getDoctorPatientId", getDoctorPatientId)
router.post("/postDoctorPatientId", postDoctorPatientId)


module.exports = router