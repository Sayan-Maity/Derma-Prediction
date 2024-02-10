const express = require("express");
const { register, check, login, check2 } = require("../controllers/AuthController");
const router = express.Router();

router.post("/register", register);
router.post("/check", check);
router.post("/check2", check2);
router.post("/login", login);

module.exports = router;
