# Define a class named Library
class Library:
    # Constructor method to initialize the Library object with a list of books
    def __init__(self, listOfBooks):
        self.books = listOfBooks

    # Method to display the available books in the library
    def displayAvailableBooks(self):
        print("Books present in this library are: ")
        for book in self.books:
            print("*" + book)

    # Method to borrow a book from the library
    def borrowBook(self, bookName):
        if bookName in self.books:
            print(f"You have been issued {bookName}. Please keep it safe and return it within 30 days")
            self.books.remove(bookName)
            return True
        else:
            print("Sorry, This book is either not available or has already been issued to someone else. Please wait "
                  "until the book is available")
            return False

    # Method to return a book to the library
    def returnBook(self, bookName):
        self.books.append(bookName)
        print("Thanks for returning this book! Hope you enjoyed reading it. Have a great day ahead!")


# Define a class named Student
class Student:
    # Method for a student to request a book
    def requestBook(self):
        self.book = input("Enter the name of the book you want to borrow: ")
        return self.book

    # Method for a student to return a book
    def returnBook(self):
        self.book = input("Enter the name of the book you want to return: ")
        return self.book


# Entry point of the program
if __name__ == "__main__":
    # Create a Library object with an initial list of books
    centralLibrary = Library(["Algorithms", "Django", "Javascript", "Python Notes"])
    # Create a Student object
    student = Student()

    while True:
        # Display the main menu to the user
        welcomeMsg = '''\n ====== Welcome to Central Library ======
        Please choose an option:
        1. List all the books
        2. Request a book
        3. Add/Return a book
        4. Exit the Library
        '''
        print(welcomeMsg)
        # Prompt the user for their choice
        a = int(input("Enter a choice: "))
        if a == 1:
            # Display the available books in the library
            centralLibrary.displayAvailableBooks()
        elif a == 2:
            # Borrow a book based on the student's request
            centralLibrary.borrowBook(student.requestBook())
        elif a == 3:
            # Return a book based on the student's input
            centralLibrary.returnBook(student.returnBook())
        elif a == 4:
            # Exit the program
            print("Thanks for choosing Central Library. Have a great day ahead!")
            break
        else:
            raise ValueError("Invalid Choice!")  # Handle invalid input choices