import time

# Get current time
current_time = time.time()
print("Current time:", current_time)

# Convert current time to string
local_time_string = time.ctime(current_time)
print("Local time string:", local_time_string)

# Format time string
formatted_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(current_time))
print("Formatted time:", formatted_time)

# Sleep for 2 seconds
print("Sleeping for 2 seconds...")
time.sleep(2)
print("Awake now!")
