const express = require("express");
const router = express.Router();

const {
  register,
  login,
  verifyLoginOtp,
} = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);
router.post("/verify-login-otp", verifyLoginOtp);

module.exports = router;
