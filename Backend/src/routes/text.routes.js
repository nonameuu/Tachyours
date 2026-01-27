const router = require("express").Router();
const db = require("../config/db");

router.get("/db-test", async (req, res) => {
  const [rows] = await db.query("SELECT DATABASE() AS db");
  res.json(rows);
});

module.exports = router;
