# 🚀 User API - Docker Practice Project

This is a simple Node.js API designed to practice Docker concepts like:

* Multi-stage builds
* Distroless images
* Container optimization

## 📦 Endpoints

* `/` → Basic response
* `/health` → Health check
* `/users` → Sample user data

## ▶️ Run locally

```bash
npm install
npm start
```

Visit:
http://localhost:3000

## 🐳 Your Tasks

### Task 1: Write Dockerfile

* Use Node base image
* Install dependencies
* Run app

### Task 2: Multi-stage Build

* Build dependencies in first stage
* Copy only required files to final stage

### Task 3: Use Distroless Image

* Replace final stage with distroless Node image
* Ensure app still runs

### Task 4: Debug

* Fix errors (common in distroless)
* Handle missing shell issues

## 💡 Hints

* No shell in distroless
* Use absolute paths
* CMD must be JSON format
* Logs via `docker logs`

---

🔥 Goal: Run this app using a distroless container

