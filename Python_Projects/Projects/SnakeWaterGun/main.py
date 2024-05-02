import random


# The user need to play with computer hence we need to add random module
# creating a function of play_game()
def play_game():
    # Creating objects of valid choice, computer choice and player choice
    valid_choices = ["snake", "water", "gun"]
    computer_choice = random.choice(valid_choices)
    player_choice = input("Enter your choice(snake/water/gun) :").lower()
    # Putting conditions on user input
    while player_choice not in valid_choices:
        print("Invalid choice!!")
        player_choice = input("Enter your choice(snake/water/gun) :").lower()
    # Displaying the tactic of player and computer
    print(f"player_chose = {player_choice}")
    print(f"computer_chose = {computer_choice}")
    # writing the logic of snake water gun

    if computer_choice == player_choice:
        print("It is a tie!!")
    elif (player_choice == "snake" and computer_choice == "water") or \
            (player_choice == "water" and computer_choice == "gun") or \
            (player_choice == "gun" and computer_choice == "snake"):
        print("You Won!!")
    else:
        print("You Lose!!")


play_game()

# closing the function