const router = require("express").Router();
const passport = require("passport");
const auth = require("../controllers/auth.controller");

/* ======================
   NORMAL AUTH
====================== */
router.post("/register", auth.register);
router.post("/resend-signup-otp", auth.resendSignupOtp);
router.post("/verify-signup-otp", auth.verifySignupOtp);
router.post("/login", auth.login);

/* ======================
   GOOGLE AUTH
====================== */

// 👉 START GOOGLE LOGIN
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// 👉 GOOGLE CALLBACK
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    const user = req.user;

    // 🔁 Redirect based on role
    if (user.role === "admin") {
      res.redirect("http://localhost:5173/dashboard");
    } else {
      res.redirect("http://localhost:5173/");
    }
  }
);

module.exports = router;
