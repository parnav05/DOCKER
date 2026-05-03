# 🚀 Flask App with Docker

This project demonstrates how to containerize a simple Python Flask application using Docker.

---

## 📌 Project Overview

This is a basic Flask web application that returns:

```
Hello DevOps World 🚀
```

The application is containerized using Docker and can be easily built and run on any system.

---

## 📁 Project Structure

```
flask-app/
│── app.py
│── requirements.txt
│── Dockerfile
```

---

## ⚙️ Prerequisites

Make sure you have the following installed:

* Docker

---

## 🐳 Build Docker Image

Run the following command to build the Docker image:

```
docker build -t flask-app .
```

---

## ▶️ Run Container

Run the container using:

```
docker run -p 5000:5000 flask-app
```

---

## 🌐 Access Application

Open your browser and go to:

```
http://localhost:5000
```

---

## 🧪 Expected Output

```
Hello DevOps World 🚀
```

---

## 🛠️ Technologies Used

* Python
* Flask
* Docker

---

## 💡 Learning Outcomes

* Understanding Dockerfile basics
* Building Docker images
* Running containers
* Exposing ports

---

## 🚀 Future Improvements

* Use lightweight base image (python:slim)
* Add non-root user for security
* Use multi-stage builds
* Add Docker Compose support

---

## 📌 Author

Parnav Dev
DevOps Learner 🚀

---

## ⭐ Contribute

Feel free to fork this repository and improve it!

---

