# Conditions will help us to write a program systematically.
# In python, there is a ladder of if, elif and else. According to this we write our code

#  Check if a number is positive, negative, or zero
number = float(input("Enter a number: "))

# Check if the number is positive, negative, or zero.
# If the condition passes in if then the code will stop executing.
# If not then it will go to elif and if condition not satisfied then it will go to else.
if number > 0:
    print("The number is positive.")
elif number < 0:
    print("The number is negative.")
else:
    print("The number is zero.")

# There are some ternary operators too in python
a = 12
b = 50
print("50 is greater than 12" if a < b else "It's False")

# There is another alternate for if-else condition and it's of matchCase

match number:
    case n if n > 0:
        print("The number is positive.")
    case n if n < 0:
        print("The number is negative.")
    case _:
        print("The number is zero.")
        