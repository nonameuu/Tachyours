const express = require("express");
const cors = require("cors");

const app = express();
const passport = require("./config/passport");

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

module.exports = app;
