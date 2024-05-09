from flask import Flask, render_template, jsonify, request, flash, session, redirect
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
import requests

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/proximaai"
mongo = PyMongo(app)
app.secret_key = "NavneetIsAGreatDeveloper"

@app.route("/")
def home():
    if 'useremail' in session:
        chats = mongo.db.chats.find({})
        myChats = [chat for chat in chats]
        print(myChats)
        return render_template("index.html", myChats = myChats)
    else:
        flash('Please create an account!', 'error')
        return redirect('/login')

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

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Get form data
        useremail = request.form['useremail']
        password = request.form['password']
        
        # Check if useremail exists
        user = mongo.db.users.find_one({'useremail': useremail})
        if user and check_password_hash(user['password'], password):
            # Set useremail in session
            session['useremail'] = useremail
            flash('User logged-in successfully!', 'success')
            return redirect('/')
        else:
            return "Invalid useremail or password"
    
    return render_template('login.html')


@app.route('/signup', methods=['GET', 'POST'])
def signup():
     if request.method == 'POST':
        # Get form data
        username = request.form['username']
        useremail = request.form['useremail']
        password = request.form['password']
        
        # Check if useremail already exists
        existing_user = mongo.db.users.find_one({'useremail': useremail})
        if existing_user:
            return "Useremail already exists. Please choose a different one."
        
        # Hash the password
        hashed_password = generate_password_hash(password)
        
        # Store user information in the database
        mongo.db.users.insert_one({'username': username, 'useremail': useremail, 'password': hashed_password})
        
        # Set useremail in session
        session['useremail'] = useremail
        flash('User created successfully!', 'success')
        return redirect('/login')
    
     return render_template('signup.html')


@app.route('/logout')
def logout():
    # Clear user session
    session.pop('useremail', None)
    return redirect('/login')

app.run(debug=True, port=5001)