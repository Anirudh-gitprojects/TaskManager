Backend Task Management API

This is a Node.js backend for a task management application using Express.js, MongoDB, and JWT authentication.

Features

User authentication (signup & login) with JWT

Task management (Create, Read, Update, Delete)

Password hashing using bcrypt.js

Secure API with authentication middleware

Deployed on Render

Tech Stack

Node.js + Express.js for the backend

MongoDB + Mongoose for the database

bcrypt.js for password hashing

jsonwebtoken (JWT) for authentication

CORS & Express JSON Middleware for request handling

Installation & Setup

1. Clone the repository

git clone https://github.com/your-repo/backend_tasks_assignment_anirudh.git
cd backend_tasks_assignment_anirudh

2. Install dependencies

npm install

3. Create a .env file in the root directory

Add the following environment variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

4. Run the server

Development Mode:

npm run dev

Production Mode:

npm start

API Endpoints

Authentication (JWT-based)

Register a new user

POST /auth/signup

Authenticate user and return JWT

POST /auth/login

Task Management (Protected Routes - Requires JWT)

Create a new task

POST /tasks

Get all tasks for the logged-in user

GET /tasks

Get a specific task

GET /tasks/:id

Update a task

PUT /tasks/:id

Delete a task

DELETE /tasks/:id

Deployment

The backend is deployed on Render. You can update the deployment by pushing changes to your repository.
