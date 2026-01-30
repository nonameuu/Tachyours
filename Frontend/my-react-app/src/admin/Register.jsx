import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    username: "",
    contact: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔐 OTP STATES
  const [showVerify, setShowVerify] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const otpRefs = useRef([]);

  useEffect(() => {
    document.body.classList.add("page-enter");
    return () => document.body.classList.remove("page-enter");
  }, []);

  // 👉 focus first otp input
  useEffect(() => {
    if (showVerify) {
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }
  }, [showVerify]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= REGISTER ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      setSuccess("Account created successfully 🎉");
      setShowVerify(true);
      startCooldown();
    } catch {
      setError("Backend not reachable");
    }
  };

  /* ================= OTP INPUT ================= */
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
    setOtpError("");

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const allFilled = otp.every((d) => d !== "");

  /* ================= VERIFY OTP ================= */
  const verifyOtp = async () => {
    setVerifying(true);
    setOtpError("");

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/verify-signup-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identifier: form.contact,
            code: otp.join(""),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setOtpError(data.message || "Invalid OTP");
        setOtp(["", "", "", "", "", ""]);
        otpRefs.current[0]?.focus();
        return;
      }

      navigate("/login");
    } catch {
      setOtpError("Verification failed");
    } finally {
      setVerifying(false);
    }
  };

  /* ================= RESEND OTP ================= */
  const resendOtp = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/resend-signup-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.contact }),
      });

      setOtp(["", "", "", "", "", ""]);
      setOtpError("");
      otpRefs.current[0]?.focus();
      startCooldown();
    } catch {
      setOtpError("Failed to resend OTP");
    }
  };

  const startCooldown = () => {
    setCooldown(60);
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="signup-root page">
      {/* LEFT */}
      <section className="left-panel">
        <div className="branding">
          <h1>
            Start your journey
            <br />
            with Tachyons.
          </h1>
          <p>Create your account and design your style.</p>
        </div>
      </section>

      {/* RIGHT */}
      <section className="right-panel">
        <div className="form-card">
          
          <h2>SIGN UP</h2>
{/* GOOGLE SIGN IN */}
<button
  className="google-btn"
  type="button"
  onClick={() =>
    (window.location.href = "http://localhost:5000/api/auth/google")
  }
>
  <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    alt="Google"
  />
  Sign in with Google
</button>

{/* OR DIVIDER */}
<div className="or-divider">
  <span>OR</span>
</div>



          <form onSubmit={handleSubmit}>
  <div className="field">
    <label>Full Name</label>
    <input
      name="full_name"
      value={form.full_name}
      onChange={handleChange}
      placeholder="Enter your full name"
      required
    />
  </div>

  <div className="field">
    <label>Username</label>
    <input
      name="username"
      value={form.username}
      onChange={handleChange}
      placeholder="Choose a username"
      required
    />
  </div>

  <div className="field">
    <label>Email</label>
    <input
      type="email"
      name="contact"
      value={form.contact}
      onChange={handleChange}
      placeholder="email@example.com"
      required
    />
  </div>

  <div className="field">
    <label>Password</label>
    <input
      type="password"
      name="password"
      value={form.password}
      onChange={handleChange}
      placeholder="Create a password"
      required
    />
  </div>


            {error && <p style={{ color: "red", fontSize: 12 }}>{error}</p>}
            {success && <p style={{ color: "green", fontSize: 12 }}>{success}</p>}

            <button className="primary-btn">Create Account</button>
          </form>

          <p className="secondary">
            Already have an account?{" "}
            <span className="login-highlight" onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </div>
      </section>

      {/* OTP MODAL */}
      {showVerify && (
        <div className="auth-overlay">
          <div className="auth-modal">
            <h3>Verify Your Account</h3>
            <p>Enter the 6-digit code sent to your email</p>

            <div className="otp-box">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (otpRefs.current[i] = el)}
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  onKeyDown={(e) => handleOtpKeyDown(e, i)}
                />
              ))}
            </div>

            {otpError && <p style={{ color: "red", fontSize: 12 }}>{otpError}</p>}

            <button
              className="verify-btn"
              disabled={!allFilled || verifying}
              onClick={verifyOtp}
            >
              {verifying ? "Verifying..." : "Verify"}
            </button>

            <button className="resend" disabled={cooldown > 0} onClick={resendOtp}>
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Code"}
            </button>
          </div>
        </div>
      )}
    


      {/* CSS */}
      <style>{`
      /* ================= GOOGLE AUTH BUTTON ================= */
.google-btn {
  width: 100%;
  height: 44px;
  border-radius: 999px;
  border: none;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(0,0,0,0.08);
  transition: all 0.2s ease;
}

.google-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(0,0,0,0.12);
}

.google-btn img {
  width: 18px;
}

/* OR LINE */
.or-divider {
  margin: 16px 0;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: #777;
}

.or-divider::before,
.or-divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #ddd;
}


/* ================= GLOBAL ================= */
* {
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

body {
  margin: 0;
}

/* ================= PAGE ================= */
.signup-root {
  height: 100vh;
  display: flex;
  background: linear-gradient(
    135deg,
    #f3e8ff,
    #e6f0ff,
    #dcf7ef
  );
}

/* LEFT */
.left-panel {
  flex: 1;
  display: flex;
  align-items: center;
}

.branding {
  padding-left: 120px;
  max-width: 600px;
}

.branding h1 {
  font-family: "Playfair Display", serif;
  font-size: 52px;
  font-weight: 600;
  margin-bottom: 14px;
  color: #111;
}

.branding p {
  font-size: 17px;
  line-height: 1.6;
  color: #333;
}

/* RIGHT */
.right-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 200px;
}

/* ================= FORM CARD ================= */
.form-card {
  width: 360px;
  padding: 28px;
  border-radius: 22px;
  background: rgba(255,255,255,0.65);
  backdrop-filter: blur(16px);
  box-shadow: 0 36px 70px rgba(0,0,0,0.15);
}

.form-card h2 {
  text-align: center;
  letter-spacing: 3px;
  font-size: 17px;
  margin-bottom: 18px;
}

/* FORM */
form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.field {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 12.5px;
  margin-bottom: 5px;
  color: #333;
}

input {
  height: 42px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 14px;
}

input::placeholder {
  color: #999;
}

input:focus {
  outline: none;
  border-color: #bba8ff;
}

/* ================= BUTTONS ================= */
.primary-btn {
  width: 100%;              /* ✅ full width */
  height: 44px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #cbb8ff, #a79bff);
  color: #2a2140;
  font-size: 14.5px;
  font-weight: 600;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;  /* ✅ text centered */
}


.primary-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.secondary {
  margin-top: 16px;
  text-align: center;
  font-size: 12.5px;
}

.login-highlight {
  color: #7b5cff;
  font-weight: 600;
  cursor: pointer;
}

/* ================= OTP OVERLAY ================= */
.auth-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 10, 30, 0.45);
  backdrop-filter: blur(6px);
  display: grid;
  place-items: center;
  z-index: 9999;
}

/* ================= OTP MODAL ================= */
.auth-modal {
  width: 360px;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(18px);
  border-radius: 22px;
  padding: 28px;
  box-shadow: 0 40px 80px rgba(0,0,0,0.25);
  text-align: center;
  animation: modalPop 0.35s ease;
}

@keyframes modalPop {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.auth-modal h3 {
  font-size: 18px;
  margin-bottom: 8px;
}

.auth-modal p {
  font-size: 13px;
  color: #555;
  margin-bottom: 18px;
}

/* ================= OTP INPUTS ================= */
.otp-box {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 16px;
}

.otp-box input {
  width: 44px;
  height: 50px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  border-radius: 12px;
  border: 1px solid #ddd;
}

.otp-box input:focus {
  border-color: #a79bff;
  box-shadow: 0 0 0 2px rgba(167,155,255,0.25);
}

/* ================= VERIFY BUTTON ================= */
.verify-btn {
  width: 100%;
  height: 44px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #a79bff, #7b5cff);
  color: #fff;
  font-size: 14.5px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 10px;
}

.verify-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ================= RESEND ================= */
.resend {
  background: none;
  border: none;
  font-size: 12.5px;
  color: #7b5cff;
  cursor: pointer;
}

.resend:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ================= MOBILE ================= */
@media (max-width: 768px) {
  .signup-root {
    flex-direction: column;
  }

  .left-panel {
    display: none;
  }

  .right-panel {
    justify-content: center;
    padding-left: 0;
  }
}
   /* 🔥 PAGE ANIMATION (FROM LOGIN) */
        .page {
          animation: fadeSlide 0.45s ease forwards;
        }

        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .form-card {
          animation: cardPop 0.45s ease 0.1s both;
        }

        @keyframes cardPop {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* 👉 REST OF YOUR EXISTING CSS (UNCHANGED) */
        * {
          box-sizing: border-box;
          font-family: "Montserrat", sans-serif;
        }

        body {
          margin: 0;
        }


      `}</style>
    </div>
  );
};

export default Register;
