<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET /search?query=keyword - search books by title or author (partial, case-insensitive)
router.get('/', async (req, res) => {
  try {
    const { query = '', page = 1, limit = 10 } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    const searchRegex = new RegExp(query, 'i');

    const filter = {
      $or: [{ title: searchRegex }, { author: searchRegex }],
    };

    const total = await Book.countDocuments(filter);

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      books,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
=======
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET /search?query=keyword - search books by title or author (partial, case-insensitive)
router.get('/', async (req, res) => {
  try {
    const { query = '', page = 1, limit = 10 } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    const searchRegex = new RegExp(query, 'i');

    const filter = {
      $or: [{ title: searchRegex }, { author: searchRegex }],
    };

    const total = await Book.countDocuments(filter);

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      books,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
>>>>>>> 72ce1d88b9cd0e9561a6f6874df614793e131656
