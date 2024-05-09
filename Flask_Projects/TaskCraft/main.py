from flask import Flask, render_template, request, redirect, session, flash
from flask_pymongo import PyMongo
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from bson import ObjectId

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/taskcraft"
mongo = PyMongo(app)
app.secret_key = "NavneetIsAGreatDeveloper"

# Specify the name of the collection for todos
TODO_COLLECTION = 'todos'

@app.route('/', methods=['GET', 'POST'])
def home():
    if 'useremail' in session:
        if request.method == "POST":
            title = request.form['title']
            desc = request.form['desc']
            todo = {'title': title, 'desc': desc, 'date_created': datetime.utcnow(), 'useremail': session['useremail']}
            mongo.db[TODO_COLLECTION].insert_one(todo)
        
        allTodo = list(mongo.db[TODO_COLLECTION].find({'useremail': session['useremail']}))
        return render_template('index.html', allTodo=allTodo)
    else:
        flash('Please log in to access this page', 'error')
        return redirect('/login')

@app.route('/show')
def products():
    if 'useremail' in session:
        allTodo = list(mongo.db[TODO_COLLECTION].find({'useremail': session['useremail']}))
        return render_template('show.html', allTodo=allTodo)
    else:
        flash('Please log in to access this page', 'error')
        return redirect('/login')

@app.route('/Update/<string:_id>', methods=["GET", "POST"])
def Update(_id):
    if 'useremail' not in session:
        flash('Please log in to access this page', 'error')
        return redirect('/login')

    if request.method == "POST":
        title = request.form['title']
        desc = request.form['desc']
        mongo.db[TODO_COLLECTION].update_one({'_id': ObjectId(_id)}, {'$set': {'title': title, 'desc': desc}})
        return redirect("/")

    allTodo = mongo.db[TODO_COLLECTION].find_one({'_id': ObjectId(_id)})
    return render_template('update.html', allTodo=allTodo)

@app.route('/Delete/<string:_id>')
def Delete(_id):
    if 'useremail' not in session:
        flash('Please log in to access this page', 'error')
        return redirect('/login')
    else:
        mongo.db[TODO_COLLECTION].delete_one({'_id': ObjectId(_id)})
        return redirect("/")

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
        
        return redirect('/login')
    
    return render_template('signup.html')

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
            return redirect('/')
        else:
            return "Invalid useremail or password"
    
    return render_template('login.html')

@app.route('/logout')
def logout():
    # Clear user session
    session.pop('useremail', None)
    return redirect('/login')

if __name__ == "__main__":
    app.run(debug=True, port=8000)
