# Loops help us to avoid repeated tasks and help us to reformat the code
# There are two types of loop, for loop and while loop

# For Loop
# A for loop is used to iterate over a sequence (e.g., a list, tuple, string, or range) or any iterable object.
for i in range(0, 101):  # Prints 1 to 100 without any effort.
    print(i)

fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# While Loop
# A while loop repeatedly executes a block of code as long as a specified condition is True
count = 0
while count < 5:
    print(count)
    count += 1

# Calculate the sum of natural numbers up to a given limit
limit = 10
sum = 0
count = 1
while count <= limit:
    sum += count
    count += 1
print("Sum of natural numbers up to", limit, "is:", sum)