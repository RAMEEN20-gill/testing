const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ message: "✅ Notification route works!" });
});

module.exports = router;
