const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false, // deprecated in mongoose 6
      // useCreateIndex: true // deprecated in mongoose 6
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting DB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
