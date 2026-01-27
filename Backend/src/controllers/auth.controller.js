const db = require("../config/db");
const bcrypt = require("bcryptjs");

// TEMP OTP STORE (dev only)
const otpStore = new Map();

/* =========================
   REGISTER
========================= */
exports.register = async (req, res) => {
  try {
    const { full_name, username, password } = req.body;

    if (!full_name || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const [existing] = await db.query(
      "SELECT id FROM users WHERE username = ?",
      [username]
    );

    if (existing.length > 0) {
      return res.status(409).json({ message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (full_name, username, password) VALUES (?, ?, ?)",
      [full_name, username, hashedPassword]
    );

    res.status(201).json({ message: "Account created successfully 🎉" });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   LOGIN (STEP 1)
========================= */
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [users] = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [identifier]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = users[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // mock OTP
    otpStore.set(identifier, {
      code: "123456",
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    console.log("🔐 LOGIN OTP:", "123456");

    res.status(200).json({ message: "OTP sent" });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   VERIFY LOGIN OTP
========================= */
exports.verifyLoginOtp = async (req, res) => {
  try {
    const { identifier, code } = req.body;

    const record = otpStore.get(identifier);
    if (!record) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(identifier);
      return res.status(400).json({ message: "OTP expired" });
    }

    if (record.code !== code) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    otpStore.delete(identifier);
    res.json({ message: "OTP verified" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
