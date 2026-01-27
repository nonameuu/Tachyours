const db = require("../config/db")
const bcrypt = require("bcryptjs")

exports.register = async (req, res) => {
  try {
    const { full_name, username, password } = req.body

    // 1. Basic validation
    if (!full_name || !username || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" })
    }

    // 2. Check if username already exists
    const [existing] = await db.query(
      "SELECT id FROM users WHERE username = ?",
      [username]
    )

    if (existing.length > 0) {
      return res.status(409).json({ message: "Username already taken" })
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // 4. Insert user
    await db.query(
      `INSERT INTO users (full_name, username, password)
       VALUES (?, ?, ?)`,
      [full_name, username, hashedPassword]
    )

    res.status(201).json({ message: "Account created successfully 🎉" })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}
