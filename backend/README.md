# Authentication in React with Express

This repository houses a robust authentication system developed with React and Express. The application encompasses key features including user registration, login, logout, token authentication, and secure password hashing through bcrypt.

## Features

- User Registration
- User Login
- User Logout
- Token Authentication
- Password Hashing (using bcrypt)
- Secure Cookie Storage

## Usage

### Prerequisites

Ensure you have the following prerequisites before setting up the application:

- Node.js and npm installed on your machine.
- MySQL database (Use the provided `signup.sql` file in the `db` folder to establish the necessary tables).

### Setup

1. **Clone the Repository:**

```bash
git clone https://github.com/lscblack/ReactExpressAuth.git
cd ReactExpressAuth
```

2. **Install Dependencies for both the Client and Server:**

```bash
cd frontend
npm install

cd ../backend
npm install
```

3. **Configure the Database:**

  - Import the `signup.sql` file in the `db` folder into your MySQL database.

4. **Configure Environment Variables:**

  - In the `server` folder, create a `.env` file and set the necessary variables.

5. **Run the Server:**

```bash
cd backend
npm start
```

6. **Run the Client:**

```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000` or `http://localhost:5173/` in your browser to access the application.

## Educational Purpose

This project is crafted by Black Devil (L.S.C) for educational purposes. Feel free to explore, modify, and learn from the codebase. For questions or suggestions, please create an issue in the repository.

Licensed under MIT License.

**Happy coding!**