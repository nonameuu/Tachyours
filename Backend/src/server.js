require("dotenv").config();

console.log("👉 DB_NAME from env:", process.env.DB_NAME);
console.log("👉 DB_PORT from env:", process.env.DB_PORT);

const app = require("./app");

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Backend running on http://localhost:5000");
});
