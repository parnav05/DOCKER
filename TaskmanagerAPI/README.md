# 🚀 Task Manager API

A simple REST API built using Node.js and Express to manage tasks.

---

## 📌 Features

* Get all tasks
* Add a new task
* File-based storage (JSON)

---

## 📂 Project Structure

```
task-manager-api/
├── app.js
├── package.json
├── routes/
│   └── tasks.js
├── data/
│   └── tasks.json
└── Dockerfile (you will create this)
```

---

## 🛠️ Run Locally

```bash
npm install
npm start
```

Server will run on:

```
http://localhost:3000
```

---

## 📡 API Endpoints

### GET /

Health check

### GET /tasks

Get all tasks

### POST /tasks

Request Body:

```json
{
  "task": "Learn Docker"
}
```

---

## 🐳 Docker Task (Your Challenge)

You need to:

1. Write a Dockerfile
2. Build Docker image
3. Run container
4. Access API

---

## 🧪 Testing

### GET tasks

```bash
curl http://localhost:3000/tasks
```

### POST task

```bash
curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d '{"task":"Learn Docker"}'
```

---

## 🎯 Goal

Run this app inside a Docker container and access it via browser or curl.

