import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    full_name: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    document.body.classList.add("page-enter");
    return () => document.body.classList.remove("page-enter");
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
        setError(data.message || "Something went wrong");
      } else {
        setSuccess("Account created successfully 🎉");
        setForm({ full_name: "", username: "", password: "" });
      }
    } catch {
      setError("Backend not reachable");
    }
  };

  return (
    <div className="signup-root page">
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

      <section className="right-panel">
        <div className="form-card">
          <h2>SIGN UP</h2>

          <button className="google-btn" type="button">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
            />
            Sign up with Google
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Full Name</label>
              <input
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </div>

            <div className="field">
              <label>Username</label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="username"
              />
            </div>

            <div className="field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Your password"
              />
              <small>Must be at least 8 characters</small>
            </div>

            {error && <p style={{ color: "red", fontSize: 12 }}>{error}</p>}
            {success && <p style={{ color: "green", fontSize: 12 }}>{success}</p>}

            <button className="primary-btn" type="submit">
              Create Account
            </button>
          </form>

          <p className="secondary">
            Already have an account?{" "}
            <span className="login-highlight" onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </div>
      </section>


      <style>{`
        * { box-sizing: border-box; font-family: "Montserrat", sans-serif; }
        body { margin: 0; }

        .page { animation: fadeSlide 0.45s ease forwards; }

        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .form-card {
          animation: cardPop 0.45s ease 0.1s both;
        }

        @keyframes cardPop {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .signup-root {
          height: 100vh;
          display: flex;
          background: linear-gradient(135deg,#f3e8ff,#e6f0ff,#dcf7ef);
        }

        .left-panel { flex: 1; display: flex; align-items: center; }
        .branding { padding-left: 120px; max-width: 600px; }
        .branding h1 {
          font-family: "Playfair Display", serif;
          font-size: 52px; font-weight: 600; color: #111;
        }
        .branding p { font-size: 17px; color: #333; }

        .right-panel {
          flex: 1; display: flex; align-items: center;
          justify-content: flex-start; padding-left: 200px;
        }

        .form-card {
          width: 360px; padding: 28px; border-radius: 22px;
          background: rgba(255,255,255,0.65);
          backdrop-filter: blur(16px);
          box-shadow: 0 36px 70px rgba(0,0,0,0.15);
        }

        .primary-btn {
          height: 44px; border-radius: 999px; border: none;
          background: linear-gradient(135deg,#cbb8ff,#a79bff);
          font-weight: 600; cursor: pointer;
        }

        .secondary { text-align: center; font-size: 12.5px; margin-top: 16px; }
        .login-highlight { color: #7b5cff; font-weight: 600; cursor: pointer; }

        @media (max-width: 768px) {
          .left-panel { display: none; }
          .right-panel { justify-content: center; padding-left: 0; }
        }
      `}</style>  


      {/* CSS */}
      <style>{`
        * {
          box-sizing: border-box;
          font-family: "Montserrat", sans-serif;
        }

        body {
          margin: 0;
        }

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

        /* FORM CARD */
        .form-card {
          width: 360px;
          padding: 28px;
          border-radius: 22px;
          background: rgba(255,255,255,0.65);
          backdrop-filter: blur(16px);
          box-shadow: 0 36px 70px rgba(0,0,0,0.15);
          margin-left: 10px;
        }

        .form-card h2 {
          text-align: center;
          letter-spacing: 3px;
          font-size: 17px;
          margin-bottom: 16px;
        }

        /* GOOGLE */
        .google-btn {
          width: 100%;
          height: 44px;
          border-radius: 12px;
          border: none;
          background: #fff;
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
          margin: 14px 0;
          font-size: 12px;
          color: #666;
        }

        .divider::before,
        .divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #ccc;
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

        small {
          margin-top: 5px;
          font-size: 11.5px;
          color: #555;
        }

        /* PRIMARY BUTTON */
        .primary-btn {
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
          justify-content: center;
        }

        /* LOGIN */
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

        /* MOBILE */
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

          .form-card {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;
