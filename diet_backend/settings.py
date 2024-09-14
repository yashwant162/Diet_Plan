import os
import json
from datetime import *
from os.path import join, dirname
from dotenv import load_dotenv, find_dotenv

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(find_dotenv(), override=True)
ENV = os.environ

DB_USER = ENV.get('user')
DB_PASSWORD= ENV.get('user')
DB_HOST = ENV.get('user')
DB_DATABASE = ENV.get('user')