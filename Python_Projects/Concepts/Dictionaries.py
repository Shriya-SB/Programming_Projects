# Dictionaries are like objects in javascript
# In python, we store it like dictionary meanings

dic = {"fav_food": "paneer", "class": 9, "school": "jesps"}
dic2 = {"castrate": "Cutout his penis", "Eco": "Reflection of sound"}
print(type(dic), dic)

print(dic.pop("class"), dic)  # Removes the element class
print(dic.get("fav_food"))  # Get the value from key
print(dic.values())  # Getting all the value from all the keys
print(dic.keys())  # Getting all the keys from dictionary
print(dic.update(dic2), dic)  # it adds up all the dictionaries and create a new one