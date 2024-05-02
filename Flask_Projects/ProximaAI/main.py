from flask import Flask, render_template, jsonify, request
from flask_pymongo import PyMongo
import requests

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/proximaai"
mongo = PyMongo(app)

@app.route("/")
def home():
    chats = mongo.db.chats.find({})
    myChats = [chat for chat in chats]
    print(myChats)
    return render_template("index.html", myChats = myChats)

@app.route("/api", methods=["GET", "POST"])
def qa():
    if request.method == "POST":
        print(request.json)
        question = request.json.get("question")
        chat = mongo.db.chats.find_one({"question": question})
        print(chat)
        if chat:
            data = {"question": question, "answer": f"{chat['answer']}"}
            return jsonify(data)
        else:
           url = "https://open-ai21.p.rapidapi.com/conversationgpt35"

           payload = {
                "messages": [
                    {
                        "role": "user",
                        "content": question
                    }
                ],
                "web_access": True,
                "system_prompt": question,
                "temperature": 0.9,
                "top_k": 5,
                "top_p": 0.9,
                "max_tokens": 256
            }
           headers = {
                "content-type": "application/json",
                "X-RapidAPI-Key": "5e0b58d473mshe8d525e781c02d1p1bde9fjsnc6b41a538d30",
                "X-RapidAPI-Host": "open-ai21.p.rapidapi.com"
            }

           response = requests.post(url, json=payload, headers=headers)
           print(response)
           data = {"question": question, "answer": response.json()['result']}
           mongo.db.chats.insert_one({"question": question, "answer": response.json()['result']})
           return jsonify(data)
    data = {"result": "Thank you! I'm just a machine learning model designed to respond to questions and generate text based on my training data. Is there anything specific you'd like to ask or discuss? "}
    return jsonify(data)

app.run(debug=True, port=5001)