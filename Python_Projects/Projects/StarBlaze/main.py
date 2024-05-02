# Importing required modules used for game development.
import pygame
import random
import math
import os

# Initialize Pygame
pygame.init()

# Set up the game window
GAME_WIDTH = 870
GAME_HEIGHT = 600
window = pygame.display.set_mode((GAME_WIDTH, GAME_HEIGHT))
pygame.display.set_caption("Space Shooter")

# Load images and sounds
def load_image(file_name, size=None):
    img = pygame.image.load(file_name)
    if size:
        img = pygame.transform.scale(img, size)
    return img

def load_sound(file_name):
    return pygame.mixer.Sound(file_name)

# Load all the assets for the game.
def load_assets():
    current_dir = os.path.dirname(__file__)
    assets = {
        "player_img": load_image(os.path.join(current_dir, "assets/img/player.png"), (40, 40)),
        "enemy_img": load_image(os.path.join(current_dir, "assets/img/enemy_game_spider.png"), (64, 64)),
        "bullet_img": load_image(os.path.join(current_dir, "assets/img/bullet.png"), (16, 45)),
        "background_img": load_image(os.path.join(current_dir, "assets/img/bg.png"), (GAME_WIDTH, GAME_HEIGHT)),
        "explosion_sound": load_sound(os.path.join(current_dir, "assets/sounds/collision.ogg"))
    }
    return assets

# Set up the clock
clock = pygame.time.Clock()

# Game parameters
player_speed = 5
bullet_speed = 10
enemy_speed = 3
score = 0
font = pygame.font.SysFont('consolas', 30)
key_state = {}
bullets = []
enemies = []
enemy_spawn_delay = 100
enemy_spawn_counter = enemy_spawn_delay

# Function to draw objects on the screen
def draw(player_x, player_y):
    window.blit(assets["background_img"], (0, 0))
    window.blit(assets["player_img"], (player_x, player_y))
    for bullet in bullets:
        window.blit(assets["bullet_img"], bullet)
    for enemy in enemies:
        window.blit(assets["enemy_img"], enemy)
    score_text = font.render("Score: " + str(score), True, (255, 255, 255))
    window.blit(score_text, (10, 10))
    pygame.display.update()

# Function to handle game over
def game_over():
    window.fill((0, 0, 0))
    game_over_text = font.render("Game Over. Your Score: " + str(score), True, (255, 255, 255))
    replay_text = font.render("Press 'R' to replay or 'Q' to quit.", True, (255, 255, 255))
    window.blit(game_over_text, (GAME_WIDTH // 2 - 200, GAME_HEIGHT // 2 - 30))
    window.blit(replay_text, (GAME_WIDTH // 2 - 200, GAME_HEIGHT // 2 + 30))
    pygame.display.update()
    # If User press r or q to manipulate game.
    while True:
        for event in pygame.event.get():
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_r:
                    return True
                elif event.key == pygame.K_q:
                    return False

# Main game loop
assets = load_assets()
replay = True
while replay:
    bullets = []
    enemies = []
    score = 0
    player_x = GAME_WIDTH // 2 - assets["player_img"].get_width() // 2
    player_y = GAME_HEIGHT - 100
    enemy_spawn_counter = enemy_spawn_delay
    running = True

    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN:
                key_state[event.key] = True
                if event.key == pygame.K_SPACE:
                    bullets.append([player_x + assets["player_img"].get_width() // 2 - assets["bullet_img"].get_width() // 2, player_y])
            elif event.type == pygame.KEYUP:
                key_state[event.key] = False

        if key_state.get(pygame.K_LEFT):
            player_x -= player_speed
        if key_state.get(pygame.K_RIGHT):
            player_x += player_speed

        player_x = max(0, min(player_x, GAME_WIDTH - assets["player_img"].get_width()))
        player_y = max(0, min(player_y, GAME_HEIGHT - assets["player_img"].get_height()))

        for bullet in bullets:
            bullet[1] -= bullet_speed

        for enemy in enemies:
            enemy[1] += enemy_speed

            if enemy[1] >= GAME_HEIGHT - assets["enemy_img"].get_height():
                running = False

            if math.sqrt((player_x - enemy[0]) ** 2 + (player_y - enemy[1]) ** 2) < assets["player_img"].get_width() // 2 + assets["enemy_img"].get_width() // 2:
                running = False

            for bullet in bullets:
                if math.sqrt((bullet[0] - enemy[0]) ** 2 + (bullet[1] - enemy[1]) ** 2) < assets["bullet_img"].get_width() // 2 + assets["enemy_img"].get_height() // 2:
                    bullets.remove(bullet)
                    enemies.remove(enemy)
                    score += 1
                    assets["explosion_sound"].play()
                    break

        if enemy_spawn_counter == 0:
            enemies.append([random.randint(0, GAME_WIDTH - assets["enemy_img"].get_width()), 0])
            enemy_spawn_counter = enemy_spawn_delay
        else:
            enemy_spawn_counter -= 1

        draw(player_x, player_y)
        clock.tick(60)

    replay = game_over()

# Quit Pygame
pygame.quit()