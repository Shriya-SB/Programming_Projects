# Import the module OS to use it.
import os

# OS methods:
# If this folder is not existing then create the folder else nothing.
if not os.path.exists("data"):
    os.mkdir("data")

# This code will rename the folder if it's name is data.
if os.path.exists("data"):
    os.rename("data", "Tutorials")

# Creating for loop to create 100 folders without any efforts.
for i in range(0, 100):
    if not os.path.exists(f"Tutorials/Tutorial_{i+1}"):
        os.mkdir(f"Tutorials/Tutorial_{i+1}")

print(os.getcwd())  # This will return current working directory path to user.

files = os.listdir("Tutorials")  # This will list all the directory present inside it.

for i in files:
    print(i)

# os.rmdir("Tutorials")  # Removes the directory only if it's empty else not.
os.chdir("C:\\Users\\My PC\\Desktop\\Programming_Projects\\My_Project\\Python_Projects")  # Changes the current
# working directory.

key = "HOME"
value = os.getenv(key)

print("Value of key from env: ", value)  # Help us to retrieve an environment variables.