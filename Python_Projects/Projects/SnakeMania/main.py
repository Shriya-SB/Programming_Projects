# Import the modules required to develop game.
from tkinter import *
import random

# Set up game parameters
game_width = 800
game_height = 600
speed = 80
space_size = 50
body_parts = 1
snake_color = "green"
food_color = "yellow"
background_color = "black"

# Snake class representing the snake in the game
class Snake:
    def __init__(self):
        self.body_size = body_parts
        self.coordinates = []
        self.squares = []

        # Initialize snake's body coordinates
        for i in range(0, body_parts):
            self.coordinates.append([0, 0])

        # Create rectangles representing snake's body
        for x, y in self.coordinates:
            square = canvas.create_rectangle(x, y, x + space_size, y + space_size, fill=snake_color, tag="snake")
            self.squares.append(square)

# Food class representing the food in the game
class Food:
    def __init__(self):
        # Generate random coordinates for food
        x = random.randint(0, int(game_width / space_size) - 1) * space_size
        y = random.randint(0, int(game_height / space_size) - 1) * space_size

        self.coordinates = [x, y]

        # Create oval representing food
        canvas.create_oval(x, y, x + space_size, y + space_size, fill=food_color, tag="food")

# Function to advance the game by one turn
def next_turn(snake, food):
    x, y = snake.coordinates[0]
    # Move snake based on current direction
    if direction == "up":
        y -= space_size
    elif direction == "down":
        y += space_size
    elif direction == "left":
        x -= space_size
    elif direction == "right":
        x += space_size

    # Insert new head coordinates for snake
    snake.coordinates.insert(0, (x, y))
    square = canvas.create_rectangle(x, y, x + space_size, y + space_size, fill=snake_color)

    snake.squares.insert(0, square)

    # Check if snake has eaten food
    if x == food.coordinates[0] and y == food.coordinates[1]:
        global score
        score += 1
        label.config(text="Score: {}".format(score))
        canvas.delete("food")
        food = Food()
    else:
        # Remove last part of snake's tail
        del snake.coordinates[-1]
        canvas.delete(snake.squares[-1])
        del snake.squares[-1]

    # Check for collisions
    if check_collisions(snake):
        game_over()
    else:
        window.after(speed, next_turn, snake, food)

# Function to change direction of the snake
def change_direction(new_direction):
    global direction
    # Update direction if valid
    if new_direction == "left":
        if direction != 'right':
            direction = new_direction
    elif new_direction == "right":
        if direction != 'left':
            direction = new_direction
    elif new_direction == "up":
        if direction != 'down':
            direction = new_direction
    elif new_direction == "down":
        if direction != 'up':
            direction = new_direction

# Function to check for collisions
def check_collisions(snake):
    x, y = snake.coordinates[0]
    # Check if snake hits walls or itself
    if x < 0 or x >= game_width:
        return True
    elif y < 0 or y >= game_height:
        return True
    for body_parts in snake.coordinates[1:]:
        if x == body_parts[0] and y == body_parts[1]:
            return True
    return False

# Function to display game over message with options to play again or quit
def game_over():
    canvas.delete(ALL)
    canvas.create_text(canvas.winfo_width() / 2, canvas.winfo_height() / 2,
                       font=('conolas', 40), text="Game Over", fill="red", tags="gameover")
    canvas.create_text(canvas.winfo_width() / 2, canvas.winfo_height() / 2 + 50,
                       font=('consolas', 20), text="Press 'r' to play again or 'q' to quit", fill="white", tags="options")

    # Bind 'r' to restart game and 'q' to quit
    window.bind('r', lambda event: restart_game())
    window.bind('q', lambda event: quit_game())

# Function to restart the game
def restart_game():
    global score, direction
    # Reset score and direction
    score = 0
    direction = 'down'
    label.config(text="Score: {}".format(score))
    # Remove game over messages and options
    canvas.delete("gameover")
    canvas.delete("options")  # Added this line to delete the option message
    # Unbind keys 'r' and 'q'
    window.unbind('r')
    window.unbind('q')
    # Initialize snake and food objects
    snake.coordinates = []
    snake.squares = []
    snake.__init__()
    food.__init__()
    # Start the game loop again
    next_turn(snake, food)


# Function to quit the game
def quit_game():
    window.destroy()

# Set up GUI window
window = Tk()
window.title("SnakeMania")
window.resizable(False, False)

score = 0
direction = 'down'

label = Label(window, text="Score: {}".format(score), font=('consolas', 40))
label.pack()

canvas = Canvas(window, bg=background_color, height=game_height, width=game_width)
canvas.pack()

window.update()

# Set window position
window_width = window.winfo_width()
window_height = window.winfo_height()
screen_width = window.winfo_screenwidth()
screen_height = window.winfo_screenheight()

x = int((screen_width / 2) - (window_width / 2))
y = int((screen_height / 2) - (window_height / 2))

window.geometry(f"{window_width}x{window_height}+{x}+{y}")

# Bind arrow keys to change direction of snake
window.bind('<Left>', lambda event: change_direction('left'))
window.bind('<Right>', lambda event: change_direction('right'))
window.bind('<Down>', lambda event: change_direction('down'))
window.bind('<Up>', lambda event: change_direction('up'))

# Initialize snake and food objects
snake = Snake()
food = Food()

# Start the game loop
next_turn(snake, food)
window.mainloop()