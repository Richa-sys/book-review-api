const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// POST /signup - register new user
router.post('/signup', signup);

// POST /login - user login
router.post('/login', login);

module.exports = router;
