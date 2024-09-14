import mysql.connector
import settings

def get_db_connection():
    connection = mysql.connector.connect(
        host=settings.DB_USER,
        user=settings.DB_USER,
        password=settings.DB_PASSWORD,
        database=settings.DB_DATABASE
    )
    return connection
