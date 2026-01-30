import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("role", data.role);
      localStorage.setItem("adminName", data.full_name || "Admin");
      localStorage.setItem("adminEmail", data.email || "admin@tachyons.app");

      if (data.role === "admin") navigate("/dashboard");
      else navigate("/");
    } catch {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
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
          <p>Sign in to continue your style journey.</p>
        </div>
      </section>

      {/* RIGHT */}
      <section className="right-panel">
        <div className="form-card">
          <h2>SIGN IN</h2>

          {/* ✅ GOOGLE SIGN IN (SAME AS REGISTER) */}
          <button
            className="google-btn"
            type="button"
            onClick={() =>
              (window.location.href =
                "http://localhost:5000/api/auth/google")
            }
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
            />
            Sign in with Google
          </button>

          {/* ✅ OR DIVIDER (SAME AS REGISTER) */}
          <div className="or-divider">
            <span>OR</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Email or Username</label>
              <input
                name="identifier"
                value={form.identifier}
                onChange={handleChange}
                placeholder="Email or Username"
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
                placeholder="Your password"
                required
              />
            </div>

            {error && <p style={{ color: "red", fontSize: 12 }}>{error}</p>}

            <button className="primary-btn" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="secondary">
            Don’t have an account?{" "}
            <span
              className="login-highlight"
              onClick={() => navigate("/register")}
            >
              Sign up
            </span>
          </p>
        </div>
      </section>

      {/* ================= STYLES ================= */}
      <style jsx>{`
        * {
          box-sizing: border-box;
          font-family: "Montserrat", sans-serif;
        }

        body {
          margin: 0;
        }

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

        .right-panel {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-left: 200px;
        }

        .form-card {
          width: 360px;
          padding: 28px;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(16px);
          box-shadow: 0 36px 70px rgba(0, 0, 0, 0.15);
        }

        .form-card h2 {
          text-align: center;
          letter-spacing: 3px;
          font-size: 17px;
          margin-bottom: 18px;
        }

        /* 🔥 GOOGLE BUTTON (SAME AS REGISTER) */
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
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          transition: all 0.2s ease;
        }

        .google-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.12);
        }

        .google-btn img {
          width: 18px;
        }

        /* 🔥 OR DIVIDER */
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

        input:focus {
          outline: none;
          border-color: #bba8ff;
        }

        .primary-btn {
  width: 100%;
  height: 44px;

  border-radius: 999px;
  border: none;

  background: linear-gradient(135deg, #cbb8ff, #a79bff);
  color: #2a2140;

  font-size: 14.5px;
  font-weight: 600;

  display: flex;             
  align-items: center;      
  justify-content: center;  

  padding: 0;                 
  line-height: 1;             

  cursor: pointer;
  margin-top: 8px;
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
      `}</style>
    </div>
  );
};

export default Login;
