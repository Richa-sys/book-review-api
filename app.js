require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Initialize Express app
const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const reviewRoutes = require('./routes/reviews');
const searchRoutes = require('./routes/search');

app.use('/', authRoutes);
app.use('/books', bookRoutes);
app.use('/reviews', reviewRoutes);
app.use('/search', searchRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Book Review API');
});


// Error handling middleware for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Server Error',
  });
});


module.exports = app;
