# Strings are the method to integrate text in our output. We should wrap it in '', "", """""" such inverted symbols

string = "my name is Navneet"  # Example of string
print(string)

# String Methods
print(len(string))
print(string.upper())  # Capitalizes the whole sentence.
print(string.lower())  # Converts the string to lower case.
print(string.capitalize())  # Capitalizes the first letter of sentence.
txt = "I love apples, apple are my favorite fruit"
print(txt.count("apple"))  # Tells the occurrence of word repeated
print(string.isupper())   # Returns true if it's a upper case string else false
print(string.islower())   # Returns true if it's a lower case string else false
print(string.removesuffix("t"))  # Removes the last letter of string suffix
print(string.removeprefix("m"))  # Removes the staring letter of string prefix
print(string.replace("Navneet", "Shriya"))  # Replaces a specific word directly.
newtxt = "                    Navneet                              "
print(newtxt.strip())  # Removes all extra unwanted spaces
print(string.split())  # Converts a string to array
