add = lambda x, y: x + y

subtract = lambda x, y: x - y

multiply = lambda x, y: x * y

divide = lambda x, y: x / y if y != 0 else ValueError("Invalid Input!!")

first_Number = float(input("Enter the first number :"))
opr = input("Enter the operator: ")
second_Number = float(input("Enter the second number :"))

# Match-Case is similar to if-else
match opr:
    case "+":
        sum = add(first_Number, second_Number)
        print(f"The sum of two number is: {sum}")
    case "-":
        sum = subtract(first_Number, second_Number)
        print(f"The sum of two number is : {sum}")
    case "*":
        sum = multiply(first_Number, second_Number)
        print(f"The sum of two number is : {sum}")
    case "/":
        sum = divide(first_Number, second_Number)
        print(f"The sum of two number is : {sum}")