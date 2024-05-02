import json

# The JSON (JavaScript Object Notation) module in Python allows you to encode and decode JSON data.

# Example 1: Encoding Python Data to JSON
data = {'name': 'John', 'age': 30, 'city': 'New York'}
json_string = json.dumps(data)
print("Encoded JSON:", json_string)

# Example 2: Decoding JSON to Python Data
json_string = '{"name": "John", "age": 30, "city": "New York"}'
decoded_data = json.loads(json_string)
print("Decoded JSON:", decoded_data)

# Example 3: Reading and Writing JSON Files
with open('data.json', 'w') as file:
    json.dump(data, file)
print("Data written to 'data.json'.")

with open('data.json', 'r') as file:
    loaded_data = json.load(file)
print("Data loaded from 'data.json':", loaded_data)

# Example 4: Handling JSON Errors
invalid_json_string = '{"name": "John", "age": 30, city: "New York"}'
try:
    invalid_data = json.loads(invalid_json_string)
except json.JSONDecodeError as e:
    print("Error decoding JSON:", e)