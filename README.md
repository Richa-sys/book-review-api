# Book Review API
Welcome to the Book Review API! This project lets you register and log in users, add books, post reviews, and search through books.

## How to Set Up

1. Clone this repo.
2. Run `npm install` to install the needed packages.
3. Add a `.env` file with your MongoDB connection string and JWT secret.
4. Start the server using `node src/app.js`.
5. Your API will be available at `http://localhost:5000`.

Book Review API Overview

The Book Review API is a user-friendly platform designed for book enthusiasts. Built with Node.js and Express.js, it allows users to engage with a variety of features related to book reviews. Users can easily register, log in, add books, write reviews, and search for their favorite titles. The API ensures secure access through JWT authentication and stores data in a MongoDB database.

  

Key Features

- User  Management: Users can sign up and log in securely using JWT authentication.
  
- Book Management: Authenticated users can add new books to the system.
  
- Book Browsing: Users can view all available books with options for pagination and filtering by author or genre.
  
- Detailed Book Information: Each book's details include average ratings and user reviews, which can also be paginated.
  
- Review System: Users can submit, update, and delete their reviews, with a limit of one review per book.
  
- Search Functionality: Users can search for books by title or author, with support for partial and case-insensitive matches.

  

Technologies Used

- Node.js: A JavaScript runtime for building server-side applications.
  
- Express.js: A web application framework for Node.js, simplifying API development.
  
- MongoDB: A NoSQL database for flexible data storage.
  
- Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js.
  
- JSON Web Tokens (JWT): For secure user authentication.
  
- bcrypt: A library for hashing passwords securely.

  

Getting Started

Prerequisites

- Ensure you have Node.js installed on your machine.
  
- Set up a MongoDB database, either locally or using a cloud service like MongoDB Atlas.
  
- Optionally, use Postman or another API testing tool for easier interaction with the API.

  

Installation Steps

1. Clone the Repository:
   ```
   git clone <repository-url>
   cd book-review-api
   ```

2. Install Dependencies:
   ```
   npm install
   ```

3. Configure Environment Variables:
   - Create a `.env` file in the root directory and add:
     ```
     PORT=5000
     DB_URI=<your-mongodb-connection-string>
     JWT_SECRET=<your-jwt-secret>
     ```

4. Start the Server:
   ```
   npm start
   ```
   - The server will run on the specified port (default is 5000).

  

API Endpoints

Authentication

- POST /signup: Register a new user.
  - Request Body:
    ```json
    {
      "username": "user1",
      "password": "password123"
    }
    ```

- POST /login: Authenticate a user and receive a JWT token.
  - Request Body:
    ```json
    {
      "username": "user1",
      "password": "password123"
    }
    ```
  - Response:
    ```json
    {
      "token": "eyJhbGci..."
    }
    ```

  

Books

- POST /books (Authenticated): Add a new book.
  - Request Body:
    ```json
    {
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "genre": "Fiction"
    }
    ```

- GET /books: Retrieve all books with pagination and optional filters (author, genre).
  - Example Query: `/books?page=1&limit=10&author=Fitzgerald`

- GET /books/:id: Get details of a specific book by ID, including ratings and reviews.

  

Reviews

- POST /books/:id/reviews (Authenticated): Submit a review for a book.
  - Request Body:
    ```json
    {
      "rating": 5,
      "comment": "Excellent book!"
    }
    ```

- PUT /reviews/:id (Authenticated): Update your own review.
  - Request Body:
    ```json
    {
      "rating": 4,
      "comment": "Updated review comment"
    }
    ```

- DELETE /reviews/:id (Authenticated): Delete your own review.

  

Search

- GET /search/:query: Search for books by title or author.
  - Example: `/search/gatsby`

  

Example API Requests Using cURL

- Sign Up a New User:
   ```
   curl -X POST http://localhost:5000/signup \
     -H "Content-Type: application/json" \
     -d '{"username":"user1","password":"password123"}'
   ```

- Login to Get JWT Token:
   ```
   curl -X POST http://localhost:5000/login \
     -H "Content-Type: application/json" \
     -d '{"username":"user1","password":"password123"}'
   ```

- Add a New Book (replace `<TOKEN>` with your JWT token):
   ```
   curl -X POST http://localhost:5000/books \
     -H "Authorization: Bearer <TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"title":"The Great Gatsby","author":"F. Scott Fitzgerald","genre":"Fiction"}'
   ```

  

Design Decisions and Assumptions

- Database Choice: MongoDB was selected for its flexible document storage, ideal for handling user reviews and data.
  
- Review Limitations: Each user can only submit one review per book to maintain integrity.
  
- Security Measures: JWT tokens are designed to be short-lived for enhanced security.
  
- Password Security: User passwords are hashed using bcrypt before being stored in the database.
  
- Performance Optimization: Pagination is implemented for both book listings and reviews to improve response times.
