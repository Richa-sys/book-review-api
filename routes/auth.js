<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// POST /signup - register new user
router.post('/signup', signup);

// POST /login - user login
router.post('/login', login);

module.exports = router;
=======
const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// POST /signup - register new user
router.post('/signup', signup);

// POST /login - user login
router.post('/login', login);

module.exports = router;
>>>>>>> 72ce1d88b9cd0e9561a6f6874df614793e131656
