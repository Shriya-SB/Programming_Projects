from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('index.html')

@app.route('/scrapper', methods=['POST'])
def scrapper():
    SearchInput = request.json.get("input")
    url = f"https://real-time-amazon-data.p.rapidapi.com/search"
    querystring = {"query": SearchInput, "country": "IN"}
    headers = {
        "X-RapidAPI-Key": "5e0b58d473mshe8d525e781c02d1p1bde9fjsnc6b41a538d30",
        "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com"
    }
    response = requests.get(url, headers=headers, params=querystring)
    print(response.json())
    return jsonify(response.json())

if __name__ == "__main__":
    app.run(debug=True)
