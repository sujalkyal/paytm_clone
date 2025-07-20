
# PayTM Clone

This project is a full-stack clone of the PayTM wallet application, featuring user authentication, account management, and money transfer functionalities. It is built with a React frontend and a Node.js/Express backend, using MongoDB for data storage.

## Features
- User registration and login
- View account balance
- Search for users
- Send money to other users
- Secure authentication using JWT
- Responsive UI built with React and Tailwind CSS

## Project Structure
- `frontend/`: React app (Vite, Tailwind CSS)
- `backend/`: Node.js/Express API server
- `Dockerfile`: MongoDB setup for local development

## How It Works
1. **Frontend**: Users interact with the React app to sign up, sign in, view their balance, search for other users, and send money.
2. **Backend**: Handles API requests for authentication, user management, account balance, and money transfers. Uses JWT for secure endpoints.
3. **Database**: MongoDB stores user and account data. The Dockerfile sets up a local MongoDB replica set for development.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- Docker (for MongoDB)

### 1. Start MongoDB with Docker

Run the following command in the project root to start MongoDB with replica set:

```sh
docker build -t paytm-mongo .
docker run -d -p 27017:27017 paytm-mongo
```

### 2. Backend Setup

```sh
cd backend
npm install
# Create a .env file with your MongoDB connection string:
echo DATABASE_URL="mongodb://localhost:27017/paytm" > .env
npm start
# Server runs on http://localhost:3001
```

### 3. Frontend Setup

```sh
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

## API Endpoints
- `POST /api/v1/user/signup` — Register a new user
- `POST /api/v1/user/signin` — Login
- `GET /api/v1/account/balance` — Get account balance (auth required)
- `POST /api/v1/account/transfer` — Send money (auth required)
- `GET /api/v1/user/bulk?filter=` — Search users

## Environment Variables
- `DATABASE_URL`: MongoDB connection string (default: `mongodb://localhost:27017/paytm`)
- `JWT_SECRET`: Secret for JWT (default: `my_secret`)

## License
MIT
