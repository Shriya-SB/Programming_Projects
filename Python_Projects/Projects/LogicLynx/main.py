# Import necessary libraries and modules.
import speech_recognition as sr  # For voice recognition.
import os  # For working with the operating system.
import webbrowser  # For opening websites.
import openai  # For interfacing with OpenAI's GPT-3.
import datetime  # For getting the current time.
import pyttsx3  # For text-to-speech conversion.
import cv2  # For webcam access.
from config import api_key  # Set the OpenAI API key.
import threading  # Import the threading module.

# Let the current chat be blank.
chatStr = ""


# Function to generate responses and store chat history.
def chat(query):
    # declare chatStr as a global variable from which we can use it in required function only.
    global chatStr
    # Print the chat conversation with the user.
    print(chatStr)
    # Print the response.
    openai.api_key = api_key
    # Print what the user said
    chatStr += f"User: {query}\n LogicLynx: "
    # Generate a response using GPT-3
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=chatStr,
        temperature=1,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    # Tie the function in try block so that we can prevent errors.
    try:
        say(response["choices"][0]["text"])  # Speak the response
        chatStr += f"{response['choices'][0]['text']}\n"  # Store the response in chat history.
        return response["choices"][0]["text"]  # Return the response.
    except Exception as error:
        print(f'LogicLynx: Some error occurred, {error}')
        say("Some error occurred from LogicLynx")


# Function to interact with GPT-3.
def ai(prompt):
    # Set the OpenAI API key.
    openai.api_key = api_key
    # Initialize the result text.
    chat_name = ''.join(prompt.split('intelligence')[1:]).strip()

    text = f"OpenAI response for Prompt: {prompt} \n *************************\n\n"
    # Generate a response using GPT-3.
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        temperature=1,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    try:
        text += response["choices"][0]["text"]  # Append the response to the result text.
        # Create a directory for Openai files if it doesn't exist.
        if not os.path.exists("Openai"):
            os.mkdir("Openai")
        # Save the conversation to a file with the chat name.
        with open(f"Openai/{chat_name}.txt", "w") as f:
            f.write(text)
            print(f"LogicLynx: {text}")
    except Exception as error:
        say("Some error occurred from LogicLynx.")
        print(f"LogicLynx: An error occurred {error}")


# Function to speak the response.
def say(text):
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()


# Function to recognize and analyze user's voice input.
def takeCommand():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        # Ensure the program listens to the user.
        audio = r.listen(source)
        try:
            print("Recognizing...")
            query = r.recognize_google(audio, language="en-in")
            print(f"User: {query}")
            return query
        except Exception as error:
            say("Some error occurred from LogicLynx")
            print(f"LogicLynx: An error occurred {error}")


# Function to open the camera and display the user's face.
def open_camera():
    global camera_display_running
    camera_display_running = True
    # Open the default camera (usually the built-in webcam).
    cap = cv2.VideoCapture(0)
    while camera_display_running:
        # Capture frame-by-frame.
        ret, frame = cap.read()

        # Display the captured frame.
        cv2.imshow('Your Face', frame)

        # Check for the 'q' key press to exit the camera display.
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release the camera and close the window.
    cap.release()
    cv2.destroyAllWindows()


# Main execution.
if __name__ == '__main__':
    print('Welcome to LogicLynx A.I')
    say("Welcome to JES Public School Science Exhibition in the field of Robotics. My name is LogicLynx, the most advanced AI "
        "assistant. You can ask any type of question and get feedback!!")
    while True:
        try:
            print("Listening...")
            r = sr.Recognizer()  # Reinitialize the voice recognizer.
            with sr.Microphone() as source:
                audio = r.listen(source)  # Continuously listen without a timeout.
            print("Recognizing...")
            query = r.recognize_google(audio, language="en-in")
            print(f"User: {query}")
            # List of common website domains to open.
            sites = [
                ["youtube", "https://www.youtube.com"],
                ["wikipedia", "https://www.wikipedia.com"],
                ["stack overflow", "https://www.stackoverflow.com"],
                ["chat gpt", "https://chat.openai.com"],
                ["open ai", "https://openai.com"],
                ["twitter", "https://www.twitter.com"],
                ["facebook", "https://www.facebook.com"],
                ["google", "http://www.google.com"],
                ["whatsapp", "http://web.whatsapp.com"],
                ["spotify", "https://open.spotify.com"]
            ]
            opened_website = None  # Track which website is opened.
            for site in sites:
                if site[0] in query.lower():
                    say(f"Opening {site[0]}...")
                    webbrowser.open(site[1])  # Open the corresponding website.
                    opened_website = site[0]  # Update the opened website.
                    break  # Exit the loop after opening a website.
            if opened_website:
                continue  # Skip the rest of the loop if a website was opened.

            # If no website is opened, check other conditions.
            if "the time" in query:
                hour = datetime.datetime.now().strftime("%H")
                min = datetime.datetime.now().strftime("%M")
                response = f"Sir, the time is {hour} on {min} minutes"
                say(response)
                print(f"LogicLynx: {response}")
            # If the user mentions "artificial intelligence," run the AI function.
            elif "using artificial intelligence".lower() in query.lower():
                ai(prompt=query)
            # If the user says "exit," stop the execution.
            elif "exit".lower() in query.lower():
                response = "Exiting the chat."
                say(response)
                print(f"LogicLynx: {response}")
                break  # Exit the loop and stop the program.
            # If the user says "reset chat," clear the chat history.
            elif "reset chat".lower() in query.lower():
                chatStr = ""
                print(f"LogicLynx: Resetting the chat.")
                say("Resetting the chat.")
            # If the user says "who created you," then give a brief information.
            elif "who created you".lower() in query.lower():
                response = "I was created from JES Public School Navneet SB on 19/8/2023."
                say(response)
                print(f"LogicLynx: {response}")
            # If the user asks your name, then tell your name.
            elif "what is your name".lower() in query.lower():
                response = "My name is LogicLynx."
                say(response)
                print(f"LogicLynx: {response}")
            # If the user asks to show the camera, open the camera display in a separate thread.
            elif "show me".lower() in query.lower():
                say("Sure, showing your face now.")
                print("Sure, showing your face now.")
                camera_thread = threading.Thread(target=open_camera)
                camera_thread.start()
            # If the user asks something else, then run the chat function.
            elif "fuck".lower() in query.lower():
                say("Same to you.")

            else:
                print("Chatting...")
                response = chat(query)
                print(f"LogicLynx: {response}")
        # If any error occurs, return the below function.
        except Exception as e:
            print(f"LogicLynx: An error occurred: {e}")
            say("Some error occurred from LogicLynx. Please try again.")