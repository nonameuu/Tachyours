import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    identifier: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Login failed");
    } else {
      // ✅ SAVE USER FIRST
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ REDIRECT BY ROLE
      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/"); // customer → home page
      }
    }
  } catch (err) {
    setError("Server error. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-page">
      {/* TOP BAR */}
      <header className="login-navbar">
        <h1
          className="brand"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          TACHYONS
        </h1>
      </header>

      {/* LOGIN CONTENT */}
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-logo">👕</div>

          <h2 className="login-title">TACHYONS</h2>
          <p className="login-subtitle">
            Welcome back! Your style missed you.
          </p>

          {/* ERROR MESSAGE */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="identifier"
              placeholder="Email or Username"
              value={form.identifier}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <Link to="/forgot-password" className="forgot-link">
                Forget password?
              </Link>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="signup-text">
            New here? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </div>

      <footer className="login-footer">
        <p>Keep moving forward — even when the thread gets tangled.</p>
        <small>© 2025 Tachyons Clothing. All Rights Reserved.</small>
      </footer>
    </div>
  );
}
