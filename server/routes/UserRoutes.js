const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getLifestyleAnalyticsData, postLifestyleAnalyticsData, diseaseHistory, getSkinCareRoutineData, getStressData, postStressData, getDietData, postDietData, getWaterIntakeData, postWaterIntakeData, postSkinCareRoutineData, getUserInfo } = require("../controllers/UserController");
const { sendEmail } = require("../controllers/NodeMailer");
const router = express.Router();

router.post("/saveDisease", authMiddleware, diseaseHistory);
router.get("/getLifestyleAnalyticsData", authMiddleware, getLifestyleAnalyticsData);
router.post("/postLifestyleAnalyticsData", authMiddleware, postLifestyleAnalyticsData);
router.get("/getSkinCareRoutineData", authMiddleware, getSkinCareRoutineData);
router.post("/postSkinCareRoutineData", authMiddleware, postSkinCareRoutineData);
router.get("/getStressData", authMiddleware, getStressData);
router.post("/postStressData", authMiddleware, postStressData);
router.get("/getDietData", authMiddleware, getDietData);
router.post("/postDietData", authMiddleware, postDietData);
router.get("/getWaterIntakeData", authMiddleware, getWaterIntakeData);
router.post("/postWaterIntakeData", authMiddleware, postWaterIntakeData);
router.post("/sendEmail", authMiddleware, sendEmail);
router.get("/getUserInfo", authMiddleware, getUserInfo);

module.exports = router;

