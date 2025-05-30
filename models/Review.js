<<<<<<< HEAD
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

// To enforce one review per user per book, add a unique compound index
reviewSchema.index({ user: 1, book: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
=======
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

// To enforce one review per user per book, add a unique compound index
reviewSchema.index({ user: 1, book: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
>>>>>>> 72ce1d88b9cd0e9561a6f6874df614793e131656
