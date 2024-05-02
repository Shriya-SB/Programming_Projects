class Customer:
    def __init__(self, name, address, phone):
        # Constructor for Customer class
        self._name = name  # Private attribute
        self._address = address  # Private attribute
        self._phone = phone  # Private attribute

    @property
    def name(self):
        # Getter method for name
        return self._name

    @property
    def address(self):
        # Getter method for address
        return self._address

    @property
    def phone(self):
        # Getter method for phone
        return self._phone

    def __str__(self):
        # String representation of Customer object
        return f"Customer: {self.name}, Address: {self.address}, Phone: {self.phone}"


class Transaction:
    def __init__(self, account, transaction_type, amount):
        # Constructor for Transaction class
        self._account = account  # Private attribute
        self._transaction_type = transaction_type  # Private attribute
        self._amount = amount  # Private attribute

    def __str__(self):
        # String representation of Transaction object
        return f"Transaction: {self._transaction_type}, Amount: {self._amount}, Account: {self._account.account_number}"


class TransactionHistory:
    def __init__(self):
        # Constructor for TransactionHistory class
        self.transactions = []  # List to store transactions

    def add_transaction(self, transaction):
        # Method to add a transaction to transaction history
        self.transactions.append(transaction)

    def get_transaction_history(self):
        # Method to get transaction history
        return self.transactions


class Account(TransactionHistory):
    def __init__(self, account_number, customer, balance=0):
        # Constructor for Account class
        super().__init__()  # Call base class constructor
        self._account_number = account_number  # Private attribute
        self._customer = customer  # Private attribute
        self._balance = balance  # Private attribute

    @property
    def account_number(self):
        # Getter method for account number
        return self._account_number

    @property
    def customer(self):
        # Getter method for customer
        return self._customer

    @property
    def balance(self):
        # Getter method for balance
        return self._balance

    @balance.setter
    def balance(self, value):
        # Setter method for balance
        self._balance = value

    def deposit(self, amount):
        # Method to deposit money into the account
        self.balance += amount  # Update balance
        transaction = Transaction(self, "Deposit", amount)  # Create transaction object
        self.add_transaction(transaction)  # Add transaction to history
        return f"Deposit of {amount} successful. New balance: {self.balance}"  # Confirmation message

    def withdraw(self, amount):
        # Method to withdraw money from the account
        if amount > self.balance:  # Check if sufficient funds available
            return "Insufficient funds"
        self.balance -= amount  # Update balance
        transaction = Transaction(self, "Withdrawal", amount)  # Create transaction object
        self.add_transaction(transaction)  # Add transaction to history
        return f"Withdrawal of {amount} successful. New balance: {self.balance}"  # Confirmation message

    def __str__(self):
        # String representation of Account object
        return f"Account: {self.account_number}, Customer: {self.customer.name}, Balance: {self.balance}"


# Function to create a customer
def create_customer():
    # Function to create a new customer
    name = input("Enter customer name: ")  # Input customer name
    address = input("Enter customer address: ")  # Input customer address
    phone = input("Enter customer phone number: ")  # Input customer phone number
    return Customer(name, address, phone)  # Return customer object


# Example usage
if __name__ == "__main__":
    # Create a customer
    customer1 = create_customer()  # Call create_customer function
    print(customer1)  # Print customer details

    # Create an account for the customer
    account_number = input("Enter account number: ")  # Input account number
    account1 = Account(account_number, customer1)  # Create account object
    print(account1)  # Print account details

    # Perform transactions
    while True:
        # Loop for transaction options
        print("\nSelect transaction:")
        print("1. Deposit")
        print("2. Withdraw")
        print("3. Exit")
        choice = input("Enter your choice: ")  # Input choice

        if choice == '1':
            # Deposit transaction
            amount = float(input("Enter deposit amount: "))  # Input deposit amount
            print(account1.deposit(amount))  # Perform deposit and print message
        elif choice == '2':
            # Withdrawal transaction
            amount = float(input("Enter withdrawal amount: "))  # Input withdrawal amount
            print(account1.withdraw(amount))  # Perform withdrawal and print message
        elif choice == '3':
            # Exit program
            print("Exiting program")
            break
        else:
            # Invalid choice
            print("Invalid choice. Please try again.")

    # Display transaction history
    print("\nTransaction History:")
    for transaction in account1.get_transaction_history():
        # Print each transaction in transaction history
        print(transaction)