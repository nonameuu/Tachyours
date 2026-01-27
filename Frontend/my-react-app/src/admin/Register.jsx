import React from "react";

const Register = () => {
  return (
    <div className="signup-root">
      {/* LEFT – BRANDING */}
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

      {/* RIGHT – FORM */}
      <section className="right-panel">
        <div className="form-card">
          <h2>SIGN UP</h2>

          {/* GOOGLE SIGN UP */}
          <button className="google-btn">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
            />
            Sign up with Google
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <form>
            <div className="field">
              <label>Full Name</label>
              <input placeholder="Your name" />
            </div>

            <div className="field">
              <label>Username</label>
              <input placeholder="username" />
            </div>

            <div className="field">
              <label>Password</label>
              <input type="password" placeholder="Your password" />
              <small>Must be at least 8 characters</small>
            </div>

            <button className="primary-btn">Create Account</button>
          </form>

          <p className="secondary">
            Already have an account?{" "}
            <span className="login-highlight">Login</span>
          </p>
        </div>
      </section>

      {/* CSS */}
      <style>{`
        * {
          box-sizing: border-box;
          font-family: "Inter", system-ui, sans-serif;
        }

        body {
          margin: 0;
          background: #000;
        }

        .signup-root {
          height: 100vh;
          display: flex;
        }

        /* LEFT PANEL */
        .left-panel {
          flex: 1;
          background: linear-gradient(
            135deg,
            #f3e8ff,
            #e6f0ff,
            #dcf7ef
          );
          position: relative;
        }

        .branding {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: 120px;
          max-width: 600px;
        }

        .branding h1 {
          font-family: "Playfair Display", serif;
          font-size: 52px;
          font-weight: 600;
          margin-bottom: 18px;
          color: #111;
        }

        .branding p {
          font-size: 18px;
          line-height: 1.6;
          color: #333;
        }

        /* RIGHT PANEL */
        .right-panel {
          width: 460px;
          background: radial-gradient(circle at top, #2a2535, #0f0e14);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* FORM CARD */
        .form-card {
          width: 100%;
          max-width: 360px;
          padding: 32px;
          border-radius: 22px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(14px);
          box-shadow: 0 40px 80px rgba(0,0,0,0.45);
          color: #fff;
        }

        .form-card h2 {
          text-align: center;
          letter-spacing: 3px;
          font-size: 18px;
          margin-bottom: 20px;
        }

        /* GOOGLE BUTTON */
        .google-btn {
          width: 100%;
          height: 44px;
          border-radius: 12px;
          border: none;
          background: #fff;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 14px;
          cursor: pointer;
        }

        .google-btn img {
          width: 18px;
        }

        /* DIVIDER */
        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 18px 0;
          font-size: 12px;
          color: #aaa;
        }

        .divider::before,
        .divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #333;
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
          font-size: 13px;
          margin-bottom: 6px;
          color: #ccc;
        }

        input {
          height: 44px;
          border-radius: 10px;
          border: none;
          background: rgba(255,255,255,0.12);
          padding: 0 14px;
          color: #fff;
          font-size: 14px;
        }

        input::placeholder {
          color: #777;
        }

        input:focus {
          outline: none;
          background: rgba(255,255,255,0.18);
        }

        small {
          margin-top: 6px;
          font-size: 12px;
          opacity: 0.7;
        }

        /* PRIMARY BUTTON */
        .primary-btn {
          margin-top: 18px;
          height: 48px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, #cbb8ff, #a79bff);
          color: #2a2140;
          font-weight: 600;
          cursor: pointer;
        }

        /* LOGIN HIGHLIGHT */
        .secondary {
          margin-top: 20px;
          text-align: center;
          font-size: 13px;
          opacity: 0.9;
        }

        .login-highlight {
          color: #cbb8ff;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .login-highlight:hover {
          color: #ffffff;
          text-shadow: 0 0 10px rgba(203,184,255,0.6);
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .signup-root {
            flex-direction: column;
          }

          .left-panel {
            display: none;
          }

          .right-panel {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;
