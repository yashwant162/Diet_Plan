import falcon
import jwt
import datetime
from falcon import HTTPUnauthorized, HTTPBadRequest, HTTPConflict
from sqlalchemy.orm import Session
from models import User
from database import get_db
import settings
import json

SECRET_KEY = settings.SECRET_KEY

class Auth:
    def register(self, req, resp):
        # Register logic here (save user details in DB)
        db = next(get_db())  # Get a database session

        try:
            # Get data from request
            first_name = req.media.get('first_name')
            last_name = req.media.get('last_name')
            email = req.media.get('email')
            password = req.media.get('password')

            # Check if the email is already registered
            existing_user = db.query(User).filter(User.email == email).first()
            if existing_user:
                raise HTTPConflict(description='Email already registered.')

            # Create a new user
            new_user = User(first_name=first_name, last_name=last_name, email=email)
            new_user.set_password(password)  # Assuming you have a method to hash the password
            db.add(new_user)
            db.commit()

            resp.media = {'message': 'User registered successfully.'}
            resp.status = falcon.HTTP_201  # 201 Created

        except Exception as e:
            db.rollback()  # Rollback in case of error
            raise HTTPBadRequest(description=str(e))

    def login(self, req, resp):
        # Validate user and create a JWT token
        db = next(get_db())  # Get a database session

        try:
            email = req.media.get('email')
            password = req.media.get('password')

            # Validate email and password
            user = db.query(User).filter(User.email == email).first()
            if user and user.check_password(password):  # Assuming you have a method to check password
                token = jwt.encode({
                    'user_id': user.id,
                    'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)
                }, SECRET_KEY, algorithm='HS256')
                resp.media = {'token': token}
            else:
                raise HTTPUnauthorized(description='Invalid email or password.')

        except Exception as e:
            raise HTTPBadRequest(description=str(e))

    def logout(self, req, resp):
        # JWT tokens are stateless, typically no action needed to logout
        resp.media = {'message': 'Logged out successfully.'}
        resp.status = falcon.HTTP_200

class Register:
    def on_post(self, req, resp):
        db = next(get_db())  # Get a database session

        try:
            raw_json = req.bounded_stream.read()
            payload = json.loads(raw_json)
            first_name = payload.get('first_name')
            last_name = payload.get('last_name')
            email = payload.get('email')
            password = payload.get('password')

            # Check if the email is already registered
            existing_user = db.query(User).filter(User.email == email).first()
            if existing_user:
                raise HTTPConflict(description='Email already registered.')

            # Create a new user
            new_user = User(first_name=first_name, last_name=last_name, email=email)
            new_user.set_password(password)  # Assuming you have a method to hash the password
            db.add(new_user)
            db.commit()

            resp.media = {'message': 'User registered successfully.'}
            resp.status = falcon.HTTP_201  # 201 Created

        except Exception as e:
            db.rollback()  # Rollback in case of error
            resp.status = falcon.HTTP_400
            resp.body = {"error": str(e)}
            raise HTTPBadRequest(description=str(e))
