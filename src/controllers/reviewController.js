const Review = require('../models/Review');
const Book = require('../models/Book');

exports.submitReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;

        // Check if user already reviewed this book
        const existing = await Review.findOne({ userId: req.user.id, bookId: req.params.id });
        if (existing) {
            return res.status(400).json({ error: 'You already reviewed this book.' });
        }

        const review = new Review({ userId: req.user.id, bookId: req.params.id, rating, comment });
        await review.save();

        // Add review reference to book
        await Book.findByIdAndUpdate(req.params.id, { $push: { reviews: review._id } });

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit review.' });
    }
};

exports.updateReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review || review.userId.toString() !== req.user.id) {
            return res.status(403).json({ error: 'You are not authorized to update this review.' });
        }
        review.rating = req.body.rating ?? review.rating;
        review.comment = req.body.comment ?? review.comment;
        await review.save();
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update review.' });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review || review.userId.toString() !== req.user.id) {
            return res.status(403).json({ error: 'You are not authorized to delete this review.' });
        }
        await review.remove();
        res.json({ message: 'Review deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete review.' });
    }
};
