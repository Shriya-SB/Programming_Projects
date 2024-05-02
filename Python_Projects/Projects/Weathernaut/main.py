# Import all the modules required to build an application.
import tkinter as tk
from tkinter import messagebox
import requests

# Create an function called get_weather to fetch the data
def get_weather():
    city = city_entry.get()
    if city and city != 'Enter City':
        # Fetch the weather api from API Ninjas
        url = "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather"
        querystring = {"city": city}
        headers = {
            "X-RapidAPI-Key": "5e0b58d473mshe8d525e781c02d1p1bde9fjsnc6b41a538d30",
            "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com"
        }
        response = requests.get(url, headers=headers, params=querystring)
        data = response.json()
        # If everything is good and successful then display this data
        if response.status_code == 200:
            weather_info_label.config(text=f"Weather in {city}:\n"
                                           f"Cloud Percentage: {data['cloud_pct']}%\n"
                                           f"Temperature: {data['temp']}°C\n"
                                           f"Feels Like: {data['feels_like']}°C\n"
                                           f"Humidity: {data['humidity']}%\n"
                                           f"Min Temperature: {data['min_temp']}°C\n"
                                           f"Max Temperature: {data['max_temp']}°C\n"
                                           f"Wind Speed: {data['wind_speed']} m/s\n"
                                           f"Wind Degrees: {data['wind_degrees']}°\n"
                                           f"Sunrise: {data['sunrise']}\n"
                                           f"Sunset: {data['sunset']}", pady=5, padx=5, font=("poppins", 15))
        else:
            messagebox.showerror("Error", "Failed to fetch weather data.")
    else:
        messagebox.showerror("Error", "Please enter a city name.")


def on_entry_click(event, entry):
    """Function to handle when the entry widget is clicked."""
    if entry.get() == 'Enter City':
        entry.delete(0, "end")  # Delete the default placeholder text
        entry.config(fg='black')  # Change text color to black


def on_focus_out(event, entry):
    """Function to handle when the entry widget loses focus."""
    if entry.get() == '':
        entry.insert(0, 'Enter City')  # Add the placeholder text back
        entry.config(fg='grey')  # Change text color to grey


# Create main window
root = tk.Tk()
root.title("Weathernaut")
root.geometry("500x500")
root.config(bg="lightblue")

# Create input field with placeholder
city_entry = tk.Entry(root, width=30, fg='grey')
city_entry.insert(0, 'Enter City')
city_entry.bind('<FocusIn>', lambda event: on_entry_click(event, city_entry))
city_entry.bind('<FocusOut>', lambda event: on_focus_out(event, city_entry))
city_entry.grid(row=0, column=0, padx=10, pady=10)

# Create button to fetch weather
get_weather_button = tk.Button(root, text="Get Weather", command=get_weather, cursor="plus")
get_weather_button.grid(row=0, column=1, padx=10, pady=10)

# Create label to display weather info
weather_info_label = tk.Label(root, text="", justify=tk.LEFT, wraplength=300, padx=10, pady=10, bg="white")
weather_info_label.grid(row=1, column=0, columnspan=2, padx=10, pady=10, sticky="nsew")

# Run the application
root.mainloop()
