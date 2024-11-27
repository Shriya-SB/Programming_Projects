import os
import webbrowser
import datetime
import pyttsx3
import cv2
import threading
import requests
import re
import pywhatkit
import speech_recognition as sr

# Global variables
chatStr = ""
chat_file = None
chat_directory = "C:/Users/My PC/Desktop/Programming_Projects/Python_Projects/Projects/Hubble_Audio/Chats"  # Define chat directory globally
engine = pyttsx3.init()  # Initialize text-to-speech engine

# Function to speak a response
def say(text):
    engine.setProperty('rate', 135)  # Adjust speech rate
    engine.say(text)
    engine.runAndWait()

# Function to initialize chat file
def initialize_chat_file():
    global chat_file
    if not os.path.exists(chat_directory):
        os.makedirs(chat_directory)  # Ensure directory exists
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    file_name = f"{chat_directory}/chat_{timestamp}.txt"
    chat_file = open(file_name, "w")  # Open file for writing
    return file_name

# Function to log chats to a file
def log_chat(user_query, hubble_response):
    global chat_file
    if chat_file:
        chat_file.write(f"User: {user_query}\nHubble Audio: {hubble_response}\n")
        chat_file.flush()  # Ensure immediate write to file

# Function to recognize voice input
def take_command():
    print("Listening...")
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        recognizer.pause_threshold = 1  # Adjust pause for natural speech
        recognizer.energy_threshold = 300  # Adjust noise sensitivity

        try:
            audio = recognizer.listen(source, timeout=5)  # 5 seconds to start speaking
            print("Recognizing...")
            query = recognizer.recognize_google(audio, language="en-in")
            print(f"User: {query}")
            return query
        except sr.WaitTimeoutError:
            say("No input detected. Please try again.")
            return ""
        except sr.UnknownValueError:
            say("Sorry, I didn't understand that. Could you repeat?")
            return ""
        except sr.RequestError as e:
            say("Unable to process the request. Check your internet connection.")
            print(f"Error: {e}")
            return ""

# Function to check internet connectivity
def check_network():
    try:
        requests.get("https://www.google.com", timeout=5)
        return True
    except requests.ConnectionError:
        return False

# Function to interact with AI API
def chat(query):
    global chatStr, chat_file

    if not check_network():
        say("No internet connection. Please check your network.")
        return "No network connection."

    if not chat_file:
        file_name = initialize_chat_file()
        print(f"Chat log initialized: {file_name}")

    chatStr += f"User: {query}\nHubble Audio: "
    url = "https://open-ai21.p.rapidapi.com/conversationgpt35"
    payload = {
        "messages": [{"role": "user", "content": query}],
        "web_access": True,
        "system_prompt": query,
        "temperature": 0.9,
        "top_k": 5,
        "top_p": 0.9,
        "max_tokens": 256
    }
    headers = {
        "content-type": "application/json",
        "X-RapidAPI-Key": "6b604a5618msh51d452bd75dbc8dp10c7dfjsn977191b38294",
        "X-RapidAPI-Host": "open-ai21.p.rapidapi.com"
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        result = response.json().get("result", "No response received.")
        say(result)
        chatStr += f"{result}\n"
        log_chat(query, result)  # Log interaction
        return result
    except Exception as e:
        error_message = f"An error occurred: {e}"
        say("An error occurred. Please try again.")
        log_chat(query, error_message)  # Log the error
        return error_message

# https://uploadhaven.com/download/3366ca0c7d500ae088848f5d2bb2f051

def ai(prompt):
    # Log time of prompt processing
    current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    chat_name = ''.join(prompt.split('intelligence')[1:]).strip().replace(" ", "_")

    # Response structure
    text = f"OpenAI response for Prompt: {prompt}\nTime: {current_time}\n*************************\n\n"
    url = "https://open-ai21.p.rapidapi.com/conversationgpt35"

    payload = {
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ],
        "web_access": False,
        "system_prompt": "",
        "temperature": 0.9,
        "top_k": 5,
        "top_p": 0.9,
        "max_tokens": 256
    }
    headers = {
        "x-rapidapi-key": "5e0b58d473mshe8d525e781c02d1p1bde9fjsnc6b41a538d30",
        "x-rapidapi-host": "open-ai21.p.rapidapi.com",
        "Content-Type": "application/json"
    }

    try:
        # API request
        response = requests.post(url, json=payload, headers=headers)
        ai_response = response.json().get('result', 'No response received.')

        # Append response to the text
        text += ai_response

        # Ensure directory exists
        output_dir = "Openai"
        os.makedirs(output_dir, exist_ok=True)

        # Save response to a text file
        file_path = f"{output_dir}/{chat_name}.txt"
        with open(file_path, "w") as file:
            file.write(text)

        print(f"LogicLynx: {ai_response}")
        say(ai_response)

    except requests.exceptions.RequestException as req_err:
        error_message = f"Network error: {req_err}"
        say("There was a network issue while accessing LogicLynx.")
        print(f"LogicLynx: {error_message}")
    except Exception as error:
        error_message = f"An error occurred: {error}"
        say("An error occurred in LogicLynx.")
        print(f"LogicLynx: {error_message}")


# Function to open websites
def open_website(query):
    sites = {
        "youtube": "https://www.youtube.com",
        "wikipedia": "https://www.wikipedia.com",
        "stack overflow": "https://stackoverflow.com",
        "google": "https://www.google.com",
    }
    for name, url in sites.items():
        if name in query.lower():
            say(f"Opening {name}...")
            webbrowser.open(url)
            return
    match = re.search(r'open (.+)', query.lower())
    if match:
        site_name = match.group(1).strip().replace(" ", "")
        say(f"Opening {site_name}...")
        webbrowser.open(f"https://{site_name}.com")

# Function to play songs
def play_song(query):
    song_name = query.lower().replace("play", "").strip()
    pywhatkit.playonyt(song_name)
    if song_name:
        say(f"Playing {song_name} on YouTube.")
        
    else:
        say("Please specify a song name.")

# Function to open the camera
def open_camera():
    cap = cv2.VideoCapture(0)
    say("Opening the camera. Press 'q' to quit.")
    while True:
        ret, frame = cap.read()
        if ret:
            cv2.imshow("Camera", frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
    cap.release()
    cv2.destroyAllWindows()

# Function to announce the time
def tell_time():
    current_time = datetime.datetime.now().strftime("%I:%M %p")
    say(f"The current time is {current_time}.")
    print(f"Hubble Audio: The current time is {current_time}.")

# Main function
if __name__ == "__main__":
    try:
        say("Welcome to Hubble Audio AI Assistant.")
        print("Hubble Audio: Welcome to Hubble Audio AI Assistant.")

        while True:
            query = take_command()
            if not query:
                continue

            if "exit" in query.lower():
                say("Goodbye! Have a great day!")
                print("Hubble Audio: Exiting. Have a great day!")
                if chat_file:
                    chat_file.close()  # Close chat log on exit
                break

            elif "reset chat" in query.lower():
                chatStr = ""
                say("Chat history reset.")
                print("Hubble Audio: Chat history reset.")

            elif "play" in query.lower():
                play_song(query)

            elif "camera" in query.lower():
                threading.Thread(target=open_camera).start()

            elif "who created you" in query.lower():
                response = "I was created by Navneet S Bhandare on 20th November 2024."
                say(response)
                print(f"Hubble Audio: {response}")

            elif "what is your name" in query.lower():
                response = "My name is Hubble Audio."
                say(response)
                print(f"Hubble Audio: {response}")

            elif "time" in query.lower():
                tell_time()

            elif "open" in query.lower():
                open_website(query)

            else:
                response = chat(query)
                print(f"Hubble Audio: {response}")

    except Exception as e:
        if chat_file:
            chat_file.close()  # Ensure chat log is closed on error
        print(f"Error: {e}") 