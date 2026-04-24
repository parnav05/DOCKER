from flask import Flask, request, jsonify, redirect
from utils import generate_short_code

app = Flask(__name__)

url_db = {}

@app.route("/")
def home():
    return "URL Shortener API Running 🚀"

@app.route("/shorten", methods=["POST"])
def shorten_url():
    data = request.get_json()
    long_url = data.get("url")

    if not long_url:
        return jsonify({"error": "URL is required"}), 400

    short_code = generate_short_code()
    url_db[short_code] = long_url

    return jsonify({
        "short_url": f"http://localhost:5000/{short_code}"
    })

@app.route("/<short_code>")
def redirect_url(short_code):
    long_url = url_db.get(short_code)

    if long_url:
        return redirect(long_url)
    else:
        return jsonify({"error": "URL not found"}), 404


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
