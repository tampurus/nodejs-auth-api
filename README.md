# Node.js Authentication API

A secure REST API with JWT authentication and role-based authorization built with Node.js, Express, and MongoDB.

## Features
- User registration and login
- JWT authentication
- Role-based authorization (Admin/User)
- Protected routes
- Password hashing
- MongoDB integration

## Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT
- bcryptjs

## API Endpoints
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/home/welcome` - Protected route for all authenticated users
- GET `/api/admin/welcome` - Protected route for admin users only

## Setup
1. Clone the repository
```bash
git clone <your-repo-url>
```

2. Install dependencies
```bash
npm install
```

3. Create .env file in root and add:
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
```

4. Run the server
```bash
npm run dev
```