const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const db = require("./db");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const full_name = profile.displayName;

        // 🔍 Check if user exists
        const [rows] = await db.query(
          "SELECT * FROM users WHERE email = ?",
          [email]
        );

        let user;

        if (rows.length === 0) {
          // ➕ Create user if not exists
          const [result] = await db.query(
            `INSERT INTO users 
             (full_name, email, username, verified, role)
             VALUES (?, ?, ?, 1, 'user')`,
            [
              full_name,
              email,
              email.split("@")[0], // auto username
            ]
          );

          user = {
            id: result.insertId,
            full_name,
            email,
            role: "user",
          };
        } else {
          user = rows[0];
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// ❗ required kahit di ka gumagamit ng session
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = passport;
