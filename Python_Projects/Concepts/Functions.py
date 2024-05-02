# Functions are the block of reusable code.
# We can pass some parameters in it and call, fill it
# We create function using def keyword

def greet(name):  # Passing the parameter name
    print(f"Hello {name}")


greet("Navneet")  # Passing the parameter Navneet and calling the function.

# Lambda functions are the unique functions that avoid over reading syntax

# Functions using def and other stuff
# def avg(x, y, z):
#     return (x, y, z) / 3

# Creating functions using only one line without any indent
add = lambda a, b: a + b
print(add(3, 5))

avg = lambda x, y, z: (x + y + z) / 3
print(avg(10, 18, 26))