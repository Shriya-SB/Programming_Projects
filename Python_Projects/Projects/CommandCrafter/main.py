# In this project we will control the operating system using python
# Import required modules to control the computer
from tkinter import *
import os


# Create the commands to control the OS
def restart():
    os.system('shutdown /r /t 1')


def logout():
    os.system('shutdown -l')


def shutdown():
    os.system('shutdown /s /t 1')


# Initialize your app
st = Tk()
st.title("System Control From Python")
st.geometry("500x500")
st.config(bg="blue")
# Create all the 3 buttons
r_button = Button(st, text="Restart", font=("Time New Roman", 30, "bold"), relief=RAISED, cursor="plus",
                  command=restart)
r_button.place(x=150, y=60, height=50, width=200)

lg_button = Button(st, text="Logout", font=("Time New Roman", 30, "bold"), relief=RAISED, cursor="plus", command=logout)
lg_button.place(x=150, y=170, height=50, width=200)

st_button = Button(st, text="ShutDown", font=("Time New Roman", 30, "bold"), relief=RAISED, cursor="plus",
                   command=shutdown)
st_button.place(x=150, y=270, height=50, width=200)

# Start the application.
st.mainloop()