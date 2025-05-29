const express = require('express');
const { addBook, getAllBooks, getBookById, searchBooks } = require('../controllers/bookController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, addBook); // Only logged-in users can add books
router.get('/', getAllBooks);
router.get('/search', searchBooks);
router.get('/:id', getBookById);

module.exports = router;
