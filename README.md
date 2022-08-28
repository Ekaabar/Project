# Project:
Implementation of a web application to test the news management’s skill of user

## 1. Backend:
    For our server layer we opted for a Node.js Express web application framework to develop web CORS Middleware: 

        1. CORS Middleware: Via Express routes, HTTP request that matches a route will be checked by CORS Middleware before coming to Security layer.
        2. Security layer: it includes:
              JWT Authentication Middleware: verify SignUp, verify token.
              Authorization Middleware: check User’s roles with record in MongoDB database.
        3. Controllers: interact with MongoDB Database via Mongoose library and send HTTP response (token, user information, data based on roles…) to Client.
        4. Database/ Models: represents the model instances that are connected to the database 
        5. Conception and Implementation And will allow us to create, delete, get objects in our database.

## 2. Frontend:
     Made up of 2 differents Folders grouping the corresponding React-components for both the Admin as well as the user's spaces


## 3. Containerization:
     Containerize our code using Docker in order to enable any other person to easily deploy the applications:
     - Dockerfile for each of folders: frontend and backend
     - Docker-compose.yml

