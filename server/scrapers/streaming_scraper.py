import requests
from bs4 import BeautifulSoup
import mysql.connector

# Database connection
conn = mysql.connector.connect(
    host="localhost",
    user="sa",
    password="dockerStrongPwd123",
    database="StreamingDatabase"
)
cursor = conn.cursor()

# Function to create tables if they don't exist
def create_tables():
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS StreamingServices (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Movies (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            release_year INT,
            streaming_service_id INT,
            FOREIGN KEY (streaming_service_id) REFERENCES StreamingServices(id)
        )
    ''')
    conn.commit()

# Function to scrape movies from a streaming service
def scrape_movies(service_name, url):
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")

    # Example scraping logic (to be adjusted based on actual website structure)
    movie_elements = soup.find_all("div", class_="movie-title")  # Adjust selector as needed

    # Insert streaming service if not exists
    cursor.execute("INSERT IGNORE INTO StreamingServices (name) VALUES (%s)", (service_name,))
    conn.commit()
    cursor.execute("SELECT id FROM StreamingServices WHERE name = %s", (service_name,))
    service_id = cursor.fetchone()[0]

    for movie in movie_elements:
        title = movie.text.strip()
        cursor.execute("INSERT INTO Movies (title, streaming_service_id) VALUES (%s, %s)", (title, service_id))

    conn.commit()

# Example usage
create_tables()
scrape_movies("Netflix", "https://www.example.com/netflix-movies")
scrape_movies("Hulu", "https://www.example.com/hulu-movies")

# Close connection
cursor.close()
conn.close()
