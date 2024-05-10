from plyer import notification
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os
from datetime import datetime
from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['primetracker']
collection = db['prices']

def notify():
    notification.notify(
        title="Extracting Data!",
        message="Extracting data from Amazon...",
        timeout=4000
    )

def get_data():
    options = Options()
    options.add_argument('--headless')
    with open('C:/Users/My PC/Desktop/Programming_Projects/NextJs_Projects/PrimeTracker/backend/products.txt') as f:
        products = f.readlines()

    # Create the 'data' directory if it doesn't exist
    if not os.path.exists('data'):
        os.makedirs('data')

    driver = webdriver.Chrome(options=options)
    
    for product in products:
        asin = product.strip()  # Extract ASIN from products.txt
        url = f'https://www.amazon.in/dp/{asin}'
        driver.get(url)
        with open(f'data/{asin}.html', 'w', encoding='utf-8') as f:
            f.write(driver.page_source)

    driver.quit()

def extract_data():
    files = os.listdir('data')
    for file_name in files:
        with open(f'data/{file_name}', encoding='utf-8') as file:
            content = file.read()

            soup = BeautifulSoup(content, 'html.parser')
            title = soup.title.getText().split(":")[0]

            # Extracting price with error handling
            price_element = soup.find(class_="a-price-whole")
            price = price_element.getText().replace(',', '').replace('.', '') if price_element else "Price not found"

            asin_element = soup.find(id="productDetails_detailBullets_sections1")
            asin = asin_element.find(class_="prodDetAttrValue").getText().strip()

            time = datetime.now()
            print(f"File: {file_name}, Title: {title}, Price: {price}, ASIN: {asin}, Time: {time}")
            collection.insert_one({'price': price, 'asin': asin, 'title': title, 'time': time})

if __name__ == "__main__":
    notify()
    get_data()
    extract_data()
