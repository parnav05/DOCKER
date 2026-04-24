# URL Shortener API (Flask)

## 📌 Overview
This is a simple URL Shortener API similar to Bitly.
It converts long URLs into short links and redirects users.

---

## 🚀 Features
- Shorten long URLs
- Redirect using short links

---

## 🛠️ Requirements
- Python 3.x
- pip

---

## ▶️ Run Locally

1. Install dependencies:
   pip install -r requirements.txt

2. Run the application:
   python app.py

3. Test API:
   http://localhost:5000

---

## 📡 API Endpoints

### POST /shorten
Request:
{
  "url": "https://google.com"
}

Response:
{
  "short_url": "http://localhost:5000/abc123"
}

---

### GET /<short_code>
Redirects to original URL

---

## 🐳 Docker Challenge

Write a Dockerfile for this app.

Hints:
- Use python base image
- Set working directory
- Copy files
- Install requirements
- Expose port 5000
- Run app.py

---

## 💡 Author
Parnav Dev - DevOps Journey 🚀
