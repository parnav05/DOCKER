const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath = path.join(__dirname, "../data/tasks.json");

// Helper: read tasks
const getTasks = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

// Helper: write tasks
const saveTasks = (tasks) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

// GET all tasks
router.get("/", (req, res) => {
  const tasks = getTasks();
  res.json(tasks);
});

// POST new task
router.post("/", (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ error: "Task is required" });
  }

  const tasks = getTasks();
  const newTask = {
    id: tasks.length + 1,
    task
  };

  tasks.push(newTask);
  saveTasks(tasks);

  res.status(201).json(newTask);
});

module.exports = router;
