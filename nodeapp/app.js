const express = require("express");
const os = require("os");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("🚀 DevOps API is running!");
});

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/info", (req, res) => {
  res.json({
    hostname: os.hostname(),
    platform: os.platform(),
    uptime: process.uptime(),
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
