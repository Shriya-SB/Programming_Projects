from flask import Flask, render_template, request, session, flash, redirect
import requests
from urllib.parse import unquote
from werkzeug.security import generate_password_hash, check_password_hash
from flask_pymongo import PyMongo

# Create the flask app
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/flavorfusion"
mongo = PyMongo(app)
app.secret_key = "NavneetIsAGreatDeveloper"

# Replace with your Spoonacular API key
API_KEY = 'de6dc34458474916a0a189944ddca40b'

# Define the route for the "Home" button
@app.route('/home', methods=['GET'])
def home():
    # Render the main page with empty recipe list and search query if user if authenticated
    if 'useremail' in session:
        return render_template('index.html', recipes=[], search_query='')
    else:
        flash('Please create an account!', 'error')
        return redirect('/login')

# Define the main route for the app
@app.route('/', methods=['GET', 'POST'])
def index():
    if 'useremail' in session:
        if request.method == 'POST':
            # If a form is submitted
            query = request.form.get('search_query', '')
            # Perform a search for recipes with the given query
            recipes = search_recipes(query)
            # Render the main page with the search results and the search query
            return render_template('index.html', recipes=recipes, search_query=query)
    
        # If it's a GET request or no form submitted
        search_query = request.args.get('search_query', '')
        decoded_search_query = unquote(search_query)
        # Perform a search for recipes with the decoded search query
        recipes = search_recipes(decoded_search_query)
        # Render the main page
        return render_template('index.html', recipes=recipes, search_query=decoded_search_query)
    else:
        flash('Please create an account!', 'error')
        return redirect('/login')

# Function to search for recipes based on the provided query
def search_recipes(query):
    url = f'https://api.spoonacular.com/recipes/complexSearch'
    params = {
        'apiKey': API_KEY,
        'query': query,
        'number': 10,
        'instructionsRequired': True,
        'addRecipeInformation': True,
        'fillIngredients': True,
    }

    # Send a GET request to the Spoonacular API with the query parameters
    response = requests.get(url, params=params)
    # If the API call is successful
    if response.status_code == 200:
        # Parse the API response as JSON data
        data = response.json()
        # Return the list of recipe results
        return data['results']
    # If the API call is not successful
    return []

# Route to view a specific recipe with a given recipe ID
@app.route('/recipe/<int:recipe_id>')
def view_recipe(recipe_id):
    if 'useremail' in session:
        # Get the search query from the URL query parameters
        search_query = request.args.get('search_query', '')
        # Build the URL to get information about the specific recipe ID from Spoonacular API
        url = f'https://api.spoonacular.com/recipes/{recipe_id}/information'
        params = {
            'apiKey': API_KEY,
        }
        # Send a GET request to the Spoonacular API to get the recipe information
        response = requests.get(url, params=params)
        # If the API call is successful
        if response.status_code == 200:
            recipe = response.json()
            return render_template('recipe.html', recipe=recipe, search_query=search_query)
        return "Recipe not found", 404
    else:
        flash('Please create an account!', 'error')
        return redirect('/login')

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

@app.route('/logout')
def logout():
    # Clear user session
    session.pop('useremail', None)
    return redirect('/login')

# Run the app in debug mode if executed directly
if __name__ == '__main__':
    app.run(debug=True)