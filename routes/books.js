const auth = require('../middleware/auth');
const {
  addBook,
  getBooks,
  getBookById,
} = require('../controllers/bookController');
   const express = require('express');
   const router = express.Router();
   const bookController = require('../controllers/bookController');

   // Other routes...

   // Search books by title or author
   router.get('/search/:query', bookController.searchBooks);

   module.exports = router;
   

const { submitReview } = require('../controllers/reviewController');

// POST /books - add a new book (authenticated)
router.post('/', auth, addBook);

// GET /books - get all books with pagination and filters
router.get('/', getBooks);

// GET /books/:id - get book details with reviews and average rating
router.get('/:id', getBookById);

// POST /books/:id/reviews - submit a review (authenticated)
router.post('/:id/reviews', auth, submitReview);

module.exports = router;
