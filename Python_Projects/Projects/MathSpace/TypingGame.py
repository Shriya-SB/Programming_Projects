# We are creating a speed calculator using pure python
# Import the time to show thw=e effect in calculator
import time

# Show the print effect
print("Welcome to WPM!")
input("Press enter to start the timer.")

# Creating start time
start_time = time.time()

# Text that should be typed by the user
text = input("Type the following sentence:\nThe quick brown fox jumps over the lazy dog.\n")

# Creating an end time
end_time = time.time()

# Calculating the total time, words per minute, accuracy, and errors
total_time = end_time - start_time
word_count = len(text.split())
wpm = (word_count / total_time) * 60
# Create an function of reference text to create accuracy
reference_text = "The quick brown fox jumps over the lazy dog."
# let errors be 0
errors = 0
for i in range(len(reference_text)):
    if i >= len(text):
        errors += 1
    elif text[i] != reference_text[i]:
        errors += 1
# The formula to find the accuracy is:
accuracy = ((word_count - errors) / word_count) * 100

# Print the output
print("Your typing words per minute is:", wpm)
print("Accuracy:", round(accuracy, 2), "%")
print("Errors:", errors)