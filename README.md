# Book Review API

Welcome to the Book Review API! This project lets you register and log in users, add books, post reviews, and search through books.

## How to Set Up

1. Clone this repo.
2. Run `npm install` to install the needed packages.
3. Add a `.env` file with your MongoDB connection string and JWT secret.
4. Start the server using `node src/app.js`.
5. Your API will be available at `http://localhost:3000`.

## API Examples

### Register a new user:

```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username": "john", "password": "mypassword"}'