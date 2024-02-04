const express = require("express");
const { register, check, login } = require("../controllers/AuthController");
const router = express.Router();

router.post("/register", register);
router.post("/check", check);
router.post("/login", login);

module.exports = router;
