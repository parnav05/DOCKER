# 🚀 Two-Tier Application (Node.js + MySQL) using Docker Compose

## 📌 Project Overview

This is a simple **two-tier application** consisting of:

* **Backend:** Node.js (Express)
* **Database:** MySQL

The Node.js application connects to the MySQL database and fetches the current time.

---

## 🧱 Architecture

* User → Node.js App → MySQL Database
* The application communicates with the database using the service name (`db`) inside Docker network.

---

## 📁 Project Structure

```
two-tier-app/
│
├── app/
│   ├── Dockerfile
│   ├── package.json
│   └── index.js
│
├── .env
├── docker-compose.yml   # You will create this
```

---

## ⚙️ Prerequisites

Make sure you have installed:

* Docker
* Docker Compose

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=mydb
```

---

## 🐳 Docker Compose Setup

You need to create a `docker-compose.yml` file with:

* 2 services: `app` and `db`
* MySQL image: `mysql:5.7`
* Node app build from `./app`
* Port mapping: `3000:3000`
* Volume for MySQL data persistence
* `depends_on` configuration

---

## ▶️ How to Run

```bash
docker compose up -d --build
```

---

## 🌍 Access Application

Open your browser:

```
http://localhost:3000
```

You should see:

```
DB Time: <current time>
```

---

## 🧠 Key Concepts Covered

* Dockerfile (custom image build)
* Docker Compose (multi-container setup)
* Service-to-service communication
* Environment variables (.env)
* Volumes (data persistence)

---

## ⚠️ Notes

* Do not use `latest` tag in production
* Always use environment variables for secrets
* Use service name (`db`) for database connection

---

## 🚀 Future Improvements

* Add Nginx (3-tier architecture)
* Add Redis (caching layer)
* Setup CI/CD pipeline
* Deploy on Kubernetes

---

## 👨‍💻 Author

Parnav Dev
DevOps Enthusiast 🚀

