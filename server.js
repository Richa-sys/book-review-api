const app = require('./app');
const PORT = process.env.PORT || 5000; // You can change to any other available port

// Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error starting the server on port ${PORT}:`, err);
    process.exit(1); // Exit if the server cannot start
  }
  console.log(`Server running on port ${PORT}`);
});
