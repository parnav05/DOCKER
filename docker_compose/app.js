const express = require("express");
const mysql = require("mysql2");

const app = express();

const db = mysql.createConnection({
  host: "db",   // ⚠️ IMPORTANT (compose service name)
  user: "root",
  password: "root",
  database: "testdb"
});

db.connect((err) => {
  if (err) {
    console.log("DB connection failed:", err);
  } else {
    console.log("Connected to MySQL");

    db.query("CREATE DATABASE IF NOT EXISTS testdb");

    db.query("USE testdb");

    db.query("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))");
  }
});

app.get("/", (req, res) => {
  db.query("INSERT INTO users (name) VALUES ('Parnav')");

  db.query("SELECT * FROM users", (err, results) => {
    res.send(results);
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
