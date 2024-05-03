# Importing required module to manipulate the Data
import pandas as pd
import os

# Create a class for this project
class StudentGradeTracker:
    # Write a constructor to initilize there values!
    def __init__(self):
        self.file_name = 'student_records.json' # File name!
        self.file_path = os.path.join(os.path.dirname(__file__), self.file_name) # File path!
        self.load_data() # Call the function for completing the task!

    # Load the data present!
    def load_data(self):
        try:
            self.data = pd.read_json(self.file_path)
        except FileNotFoundError:
            print("No existing data file found. Starting with an empty database.")
            self.data = pd.DataFrame(columns=['Student ID', 'Name', 'Subjects', 'Percentage', 'Address'])

    # Save the record in json format!
    def save_data(self):
        self.data.to_json(self.file_path, orient='records', indent=4)

    # Logic to add a new student with a unique id
    def add_student(self):
        # Asking to fill required fields
        student_id = input("Enter Student ID: ")
        name = input("Enter Student Name: ")
        address = input("Enter Student Address: ")

        # If user is anonymous then don't permit them to enter this app.
        if student_id in self.data['Student ID'].values:
            print("Student ID already exists. Please enter a unique ID.")
            return

        # Create a dictionary and add all the subjects making an input and asking the user to fill it.
        subjects = {}
        for subject in ['Maths', 'Science', 'English', 'Hindi', 'CS', 'Social Science']:
            mark = int(input(f"Enter marks obtained in {subject}: "))
            subjects[subject] = mark

        # Calculating the percentage using formulas
        total_marks = sum(subjects.values())
        percentage = total_marks / 6

        # Filling the fields and saving the data
        new_entry = {
            'Student ID': student_id,
            'Name': name,
            'Subjects': subjects,
            'Percentage': f"{percentage:.2f}%",
            'Address': address
        }

        # Frame the data and save it inside the file!
        self.data = pd.concat([self.data, pd.DataFrame([new_entry])], ignore_index=True)
        self.save_data()
        print("Student record added successfully.")

    # Logic To Update Student
    def update_student(self):
        # Asking student's ID to update student.
        student_id = input("Enter Student ID to update: ")

        # If ID is correct then give options to update student
        if student_id in self.data['Student ID'].values:
            new_name = input("Enter updated name for the student: ")
            new_address = input("Enter updated address for the student: ")

            updated_subjects = {}
            for subject in ['Maths', 'Science', 'English', 'Hindi', 'CS', 'Social Science']:
                new_grade = input(f"Enter updated grade for {subject}: ")
                updated_subjects[subject] = int(new_grade)

            # Reframe the data again.
            self.data.loc[self.data['Student ID'] == student_id, 'Name'] = new_name
            self.data.loc[self.data['Student ID'] == student_id, 'Subjects'] = [updated_subjects]
            self.data.loc[self.data['Student ID'] == student_id, 'Address'] = new_address

            # Calculate the new percentage
            total_marks = sum(updated_subjects.values())
            percentage = total_marks / 6
            self.data.loc[self.data['Student ID'] == student_id, 'Percentage'] = f"{percentage:.2f}%"

            self.save_data()
            print("Student record updated successfully.")
        else:
            print("Student ID not found.")

    # Logic To Delete Student
    def delete_student(self):
        # Asking Student ID to delete student
        student_id = input("Enter Student ID to delete: ")

        # If User ID is true then delete the student
        if student_id in self.data['Student ID'].values:
            self.data = self.data[self.data['Student ID'] != student_id]
            self.save_data()
            print("Student record deleted successfully.")
        else:
            print("Student ID not found.")
    
    # Display the data in the terminal itself that how many students are available and what marks they possess
    def view_student(self, student_id=None):
        if student_id:
            student_record = self.data[self.data['Student ID'] == student_id]
            if not student_record.empty:
                print(student_record[['Student ID', 'Name', 'Subjects', 'Percentage', 'Address']].to_string(index=False))
            else:
                print("Student ID not found.")
        else:
            print(self.data.to_string(index=False))

    def average_grade(self, student_id=None):
        if student_id:
            student_data = self.data[self.data['Student ID'] == student_id]
            if not student_data.empty:
                percentage = float(student_data['Percentage'].str.rstrip('%').astype(float).values[0])
                print("Average grade for student {}: {:.2f}%".format(student_id, percentage))
            else:
                print("No valid grades found for student {}".format(student_id))
        else:
            if not self.data.empty:
                total_percentage = self.data['Percentage'].str.rstrip('%').astype(float).sum()
                average_percentage = total_percentage / len(self.data)
                print("Average grade for all students: {:.2f}%".format(average_percentage))
            else:
                print("No valid grades found for any student")


tracker = StudentGradeTracker()

while True:
    print("""******Welcome to Student Grade Tracker******
    1) Add Student Record
    2) View Student Record
    3) Average Grade Of Student
    4) Update Student Record
    5) Delete Student Record
    6) Exit""")

    choice = input('Enter the option (1, 2, 3, 4, 5, 6): ')

    if choice == '1':
        tracker.add_student()
    elif choice == '2':
        print("\nAll student records:")
        tracker.view_student()
    elif choice == '3':
        tracker.average_grade()
    elif choice == '4':
        tracker.update_student()
    elif choice == '5':
        tracker.delete_student()
    elif choice == '6':
        print("Thanks for using Student Grade Tracker!")
        break
    else:
        print("Invalid input. Please enter a valid option (1-6).")