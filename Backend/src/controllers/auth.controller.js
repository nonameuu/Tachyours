const db = require("../config/db");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const signupOtpStore = new Map();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const sendEmailOtp = async (email, otp) => {
  await transporter.sendMail({
    from: '"Hoy Code mo ito na!" <projectcapstone404@gmail.com>',
    to: email,
    subject: "Tachyons Verification Code",
    html: `
      <div style="
        max-width: 480px;
        margin: 0 auto;
        padding: 32px 24px;
        font-family: Arial, Helvetica, sans-serif;
        color: #111;
        background: #ffffff;
      ">
        <h2 style="
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 12px;
        ">
          Tachyons Verification Code
        </h2>

        <p style="
          font-size: 14px;
          color: #444;
          margin-bottom: 28px;
        ">
          Your one-time verification code is:
        </p>

        <div style="
          font-size: 36px;
          font-weight: 700;
          letter-spacing: 6px;
          text-align: center;
          margin: 24px 0;
          color: #000;
        ">
          ${otp}
        </div>

        <p style="
          font-size: 13px;
          color: #666;
          margin-top: 24px;
        ">
          This code will expire in <strong>5 minutes</strong>.
        </p>

        <hr style="
          margin: 32px 0;
          border: none;
          border-top: 1px solid #eee;
        " />

        <p style="
          font-size: 12px;
          color: #999;
        ">
          If you didn’t request this code, you can safely ignore this email.
        </p>
      </div>
    `,
  });
};


/* REGISTER */
exports.register = async (req, res) => {
  const { full_name, username, contact, password } = req.body;

  if (!full_name || !username || !contact || !password)
    return res.status(400).json({ message: "All fields required" });

  const [existing] = await db.query(
    "SELECT id FROM users WHERE email=? OR username=?",
    [contact, username]
  );

  if (existing.length)
    return res.status(409).json({ message: "User exists" });

  const hashed = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO users (full_name, username, email, password, verified, role) VALUES (?,?,?,?,0,'user')",
    [full_name, username, contact, hashed]
  );

  const otp = generateOtp();
  signupOtpStore.set(contact, {
    code: otp,
    expiresAt: Date.now() + 5 * 60 * 1000,
    attempts: 0,
  });

  await sendEmailOtp(contact, otp);
  res.json({ message: "OTP sent" });
};

/* VERIFY OTP */
exports.verifySignupOtp = async (req, res) => {
  const { identifier, code } = req.body;
  const record = signupOtpStore.get(identifier);

  if (!record) return res.status(400).json({ message: "OTP not found" });
  if (Date.now() > record.expiresAt)
    return res.status(400).json({ message: "OTP expired" });

  if (record.code !== code)
    return res.status(400).json({ message: "Invalid OTP" });

  signupOtpStore.delete(identifier);
  await db.query("UPDATE users SET verified=1 WHERE email=?", [identifier]);

  res.json({ message: "Account verified" });
};

/* RESEND OTP */
exports.resendSignupOtp = async (req, res) => {
  const { email } = req.body;
  const otp = generateOtp();

  signupOtpStore.set(email, {
    code: otp,
    expiresAt: Date.now() + 5 * 60 * 1000,
    attempts: 0,
  });

  await sendEmailOtp(email, otp);
  res.json({ message: "OTP resent" });
};

/* LOGIN */
exports.login = async (req, res) => {
  const { identifier, password } = req.body;

  const [users] = await db.query(
    "SELECT * FROM users WHERE email=? OR username=?",
    [identifier, identifier]
  );

  if (!users.length)
    return res.status(401).json({ message: "Invalid credentials" });

  const user = users[0];

  if (!user.verified)
    return res.status(403).json({ message: "Verify your account first" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok)
    return res.status(401).json({ message: "Invalid credentials" });

  res.json({
    role: user.role,
    full_name: user.full_name,
    email: user.email,
  });
};
