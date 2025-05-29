const Book = require('../models/Book');

exports.addBook = async (req, res) => {
    const { title, author, genre } = req.body;
    try {
        const book = new Book({ title, author, genre });
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add book.' });
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        const { page = 1, limit = 10, author, genre } = req.query;
        const filter = {};
        if (author) filter.author = new RegExp(author, 'i'); // Case-insensitive
        if (genre) filter.genre = new RegExp(genre, 'i');

        const books = await Book.find(filter)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Book.countDocuments(filter);
        res.json({ total, books });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch books.' });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('reviews');
        if (!book) return res.status(404).json({ error: 'Book not found.' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch book details.' });
    }
};

exports.searchBooks = async (req, res) => {
    try {
        const { query } = req.query;
        const books = await Book.find({
            $or: [
                { title: new RegExp(query, 'i') },
                { author: new RegExp(query, 'i') }
            ]
        });
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Search failed.' });
    }
};
