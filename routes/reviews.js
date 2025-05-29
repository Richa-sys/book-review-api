const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

// PUT /reviews/:id - update your review (authenticated)
router.put('/:id', auth, updateReview);

// DELETE /reviews/:id - delete your review (authenticated)
router.delete('/:id', auth, deleteReview);

module.exports = router;
