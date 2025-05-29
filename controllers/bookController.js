const Book = require('../models/Book');
const Review = require('../models/Review');
const mongoose = require('mongoose');

   exports.searchBooks = async (req, res) => {
       const query = req.params.query;
       try {
           const books = await Book.find({
               $or: [
                   { title: { $regex: query, $options: 'i' } },
                   { author: { $regex: query, $options: 'i' } }
               ]
           });
           res.json(books);
       } catch (error) {
           res.status(500).json({ message: 'Error searching for books' });
       }
   };
// @desc    Add a new book
// @route   POST /books
// @access  Private
exports.addBook = async (req, res) => {
  const { title, author, genre, description } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }

  try {
    const book = await Book.create({ title, author, genre, description });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all books with pagination and optional filtering
// @route   GET /books
// @access  Public
exports.getBooks = async (req, res) => {
  try {
    let { page = 1, limit = 10, author, genre } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const query = {};
    if (author) {
      query.author = new RegExp(author, 'i');
    }
    if (genre) {
      query.genre = new RegExp(genre, 'i');
    }

    const total = await Book.countDocuments(query);
    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      books,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get book details by ID including average rating and paginated reviews
// @route   GET /books/:id
// @access  Public
exports.getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Pagination for reviews
    let { page = 1, limit = 5 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const reviewQuery = { book: bookId };
    const totalReviews = await Review.countDocuments(reviewQuery);
    const reviews = await Review.find(reviewQuery)
      .populate('user', 'username')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Calculate average rating
    const avgResult = await Review.aggregate([
      { $match: { book: book._id } },
      {
        $group: {
          _id: '$book',
          avgRating: { $avg: '$rating' },
        },
      },
    ]);

    const avgRating = avgResult.length > 0 ? avgResult[0].avgRating : null;

    res.json({
      book,
      averageRating: avgRating ? avgRating.toFixed(2) : null,
      reviews: {
        totalReviews,
        page,
        pages: Math.ceil(totalReviews / limit),
        data: reviews,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
