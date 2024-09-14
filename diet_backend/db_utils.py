import mysql.connector

def get_db_connection():
    connection = mysql.connector.connect(
        host="localhost",
        user="api_user",
        password="your_password",
        database="my_api_db"
    )
    return connection
