# Define an empty list to store the inputs
tasks = []


# We will provide an input to user and store it in list
def addTask():
    task = input("Enter your task: ")
    tasks.append(task)
    print("Task Added!")


# Here also we will provide the input but if the task will match with user's actual task then only delete the task
def removeTask():
    task = input("Enter your task: ")
    if task in tasks:
        tasks.remove(task)
        print("Task Removed!")
    else:
        print("Task Not Found!!")


# Here we will display all the task from list
def displayTask():
    print("Task List:")
    for task in tasks:
        print("-" + task)


# Here we will fire an infinite loop where we will provide options to user and utilize above functions.
while True:
    print("""*****Welcome To Our App*****
    1) Add Task
    2) Remove Task
    3) Display Task
    4) Exit""")
    choice = int(input("Enter your choice in (1, 2, 3, 4) options: "))
    if choice == 1:
        addTask()
    elif choice == 2:
        removeTask()
    elif choice == 3:
        displayTask()
    elif choice == 4:
        print("Thanks for visiting our app!!")
        break
    else:
        raise ValueError("Invalid Input!!")