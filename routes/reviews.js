<<<<<<< HEAD
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
=======
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
>>>>>>> 72ce1d88b9cd0e9561a6f6874df614793e131656
