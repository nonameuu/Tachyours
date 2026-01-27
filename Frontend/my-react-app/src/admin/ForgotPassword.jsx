import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const handleSubmit = (e) => {
    e.preventDefault(); // ❗ para hindi mag refresh ang page
    // dito mo ilalagay later ang reset logic (API, alert, etc.)
  };

  return (
    <div className="login-page">
      {/* TOP BAR */}
      <header className="login-navbar">
        <h1 className="brand">TACHYONS</h1>
      </header>

      {/* CONTENT */}
      <div className="login-wrapper">
        <div className="login-card">
          {/* ICON */}
          <div className="login-logo">🔒</div>

          <h2 className="login-title">Forgot Password</h2>
          <p className="login-subtitle">
            Enter your email or phone number and we’ll help you reset your password.
          </p>

          {/* FORM */}
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email / Phone Number"
              required
            />

            <button type="submit" className="login-btn">
              Send Reset Link
            </button>
          </form>

          {/* BACK TO LOGIN */}
          <p className="signup-text">
            Remembered your password?{" "}
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="login-footer">
        <p>
          Keep moving forward — even when the thread gets tangled.
        </p>
        <small>© 2025 Tachyons Clothing. All Rights Reserved.</small>
      </footer>
    </div>
  );
}
