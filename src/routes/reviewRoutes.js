const express = require('express');
const { submitReview, updateReview, deleteReview } = require('../controllers/reviewController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:id/reviews', verifyToken, submitReview); // Submit review for a book
router.put('/reviews/:id', verifyToken, updateReview);  // Update own review
router.delete('/reviews/:id', verifyToken, deleteReview); // Delete own review

module.exports = router;
