const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("🚀 User API is running");
});

app.get("/health", (req, res) => {
    res.json({ status: "OK" });
});

app.get("/users", (req, res) => {
    res.json([
        { id: 1, name: "Parnav" },
        { id: 2, name: "DevOps Learner" }
    ]);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
